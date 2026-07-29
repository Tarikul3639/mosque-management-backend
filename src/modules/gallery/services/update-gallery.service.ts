import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { FileService } from '@/common/file/file.service';

import { UserRole } from '@/lib/prisma/client';

import { GALLERY_MESSAGES } from '../constants/gallery.constants';
import { UpdateGalleryDto } from '../dto/requests/update-gallery.dto';
import { GalleryResponseDto } from '../dto/responses/gallery-response.dto';
import { GalleryMapper } from '../mappers/gallery.mapper';

@Injectable()
export class UpdateGalleryService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly fileService: FileService,
    ) { }

    async execute(
        galleryId: string,
        dto: UpdateGalleryDto,
        userId: string,
        role: UserRole,
    ): Promise<GalleryResponseDto> {
        const existingGallery = await this.prisma.gallery.findUnique({
            where: {
                id: galleryId,
            },
            select: {
                id: true,
                createdById: true,
                images: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        if (!existingGallery) {
            throw new NotFoundException(GALLERY_MESSAGES.NOT_FOUND);
        }

        const isOwner = existingGallery.createdById === userId;

        const isSuperAdmin = role === UserRole.SUPER_ADMIN;

        if (!isOwner && !isSuperAdmin) {
            throw new ForbiddenException(GALLERY_MESSAGES.FORBIDDEN);
        }

        const gallery = await this.prisma.gallery.update({
            where: {
                id: galleryId,
            },

            data: {
                ...(dto.title !== undefined && {
                    title: dto.title,
                }),

                ...(dto.description !== undefined && {
                    description: dto.description,
                }),

                ...(dto.order !== undefined && {
                    order: dto.order,
                }),

                ...(dto.imageIds !== undefined && {
                    images: {
                        set: dto.imageIds.map((id) => ({
                            id,
                        })),
                    },
                }),

                updatedById: userId,
            },

            include: {
                images: {
                    select: {
                        id: true,
                        url: true,
                    },
                },

                createdBy: {
                    select: {
                        id: true,
                        name: true,
                    },
                },

                updatedBy: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        const imageIds = dto.imageIds;

        if (imageIds !== undefined) {
            const removedImages = existingGallery.images.filter(
                (image) => !imageIds.includes(image.id),
            );

            for (const image of removedImages) {
                await this.fileService.deleteById(image.id);
            }
        }

        return GalleryMapper.toResponse(gallery);
    }
}
