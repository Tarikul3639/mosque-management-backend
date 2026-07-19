import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { DEVELOPMENT_PROJECT_MESSAGES } from '../constants/development-project.constants';
import { DevelopmentProjectResponseDto } from '../dto/responses/development-project-response.dto';
import { DevelopmentProjectMapper } from '../mappers/development-project.mapper';

@Injectable()
export class GetDevelopmentProjectService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(projectId: string): Promise<DevelopmentProjectResponseDto> {
        const project = await this.prisma.developmentProject.findUnique({
            where: {
                id: projectId,
            },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
                updatedBy: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
            },
        });

        if (!project) {
            throw new NotFoundException(DEVELOPMENT_PROJECT_MESSAGES.NOT_FOUND);
        }

        return DevelopmentProjectMapper.toResponse(project);
    }
}
