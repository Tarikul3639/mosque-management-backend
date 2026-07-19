import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { UserRole } from '@/lib/prisma/client';

import { DEVELOPMENT_PROJECT_MESSAGES } from '../constants/development-project.constants';

@Injectable()
export class DeleteDevelopmentProjectService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(
        projectId: string,
        userId: string,
        role: UserRole,
    ): Promise<{ message: string }> {
        const project = await this.prisma.developmentProject.findUnique({
            where: {
                id: projectId,
            },
            select: {
                id: true,
                createdById: true,
            },
        });

        if (!project) {
            throw new NotFoundException(DEVELOPMENT_PROJECT_MESSAGES.NOT_FOUND);
        }

        const isOwner = project.createdById === userId;

        const isSuperAdmin = role === UserRole.SUPER_ADMIN;

        if (!isOwner && !isSuperAdmin) {
            throw new ForbiddenException(DEVELOPMENT_PROJECT_MESSAGES.FORBIDDEN);
        }

        await this.prisma.developmentProject.delete({
            where: {
                id: projectId,
            },
        });

        return {
            message: DEVELOPMENT_PROJECT_MESSAGES.DELETED,
        };
    }
}
