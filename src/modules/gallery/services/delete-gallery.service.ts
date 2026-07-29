import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "@/common/prisma/prisma.service";
import { FileService } from "@/common/file/file.service";

import { UserRole } from "@/lib/prisma/client";

import { GALLERY_MESSAGES } from "../constants/gallery.constants";

@Injectable()
export class DeleteGalleryService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly fileService: FileService,
    ) { }

    async execute(
        galleryId: string,
        userId: string,
        role: UserRole,
    ): Promise<{ message: string }> {
        const gallery = await this.prisma.gallery.findUnique({
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

        if (!gallery) {
            throw new NotFoundException(
                GALLERY_MESSAGES.NOT_FOUND,
            );
        }

        const isOwner = gallery.createdById === userId;
        const isSuperAdmin = role === UserRole.SUPER_ADMIN;

        if (!isOwner && !isSuperAdmin) {
            throw new ForbiddenException(
                GALLERY_MESSAGES.FORBIDDEN,
            );
        }

        await this.prisma.gallery.delete({
            where: {
                id: galleryId,
            },
        });

        for (const image of gallery.images) {
            await this.fileService.deleteById(image.id);
        }

        return {
            message: GALLERY_MESSAGES.DELETED,
        };
    }
}