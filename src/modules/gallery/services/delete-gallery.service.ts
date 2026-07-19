import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { UserRole } from '@/lib/prisma/client';

import { GALLERY_MESSAGES } from '../constants/gallery.constants';

@Injectable()
export class DeleteGalleryService {
    constructor(private readonly prisma: PrismaService) { }

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
            },
        });

        if (!gallery) {
            throw new NotFoundException(GALLERY_MESSAGES.NOT_FOUND);
        }

        const isOwner = gallery.createdById === userId;
        const isSuperAdmin = role === UserRole.SUPER_ADMIN;

        if (!isOwner && !isSuperAdmin) {
            throw new ForbiddenException(GALLERY_MESSAGES.FORBIDDEN);
        }

        await this.prisma.gallery.delete({
            where: {
                id: galleryId,
            },
        });

        return {
            message: GALLERY_MESSAGES.DELETED,
        };
    }
}
