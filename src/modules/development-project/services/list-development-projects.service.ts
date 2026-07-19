import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

import {
    DEVELOPMENT_PROJECT_DEFAULT_LIMIT,
    DEVELOPMENT_PROJECT_DEFAULT_PAGE,
} from '../constants/development-project.constants';
import { DevelopmentProjectQueryDto } from '../dto/requests/development-project-query.dto';
import { DevelopmentProjectListResponseDto } from '../dto/responses/development-project-list-response.dto';
import { DevelopmentProjectMapper } from '../mappers/development-project.mapper';

@Injectable()
export class ListDevelopmentProjectsService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(
        query: DevelopmentProjectQueryDto,
    ): Promise<DevelopmentProjectListResponseDto> {
        const page = query.page ?? DEVELOPMENT_PROJECT_DEFAULT_PAGE;

        const limit = query.limit ?? DEVELOPMENT_PROJECT_DEFAULT_LIMIT;

        const skip = (page - 1) * limit;

        const where = {
            ...(query.search && {
                OR: [
                    {
                        title: {
                            contains: query.search,
                            mode: 'insensitive' as const,
                        },
                    },
                    {
                        description: {
                            contains: query.search,
                            mode: 'insensitive' as const,
                        },
                    },
                ],
            }),

            ...(query.status && {
                status: query.status,
            }),
        };

        const [projects, total] = await Promise.all([
            this.prisma.developmentProject.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
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
            }),

            this.prisma.developmentProject.count({
                where,
            }),
        ]);

        return {
            data: DevelopmentProjectMapper.toResponseList(projects),
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
