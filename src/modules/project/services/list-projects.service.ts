import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

import {
  DEVELOPMENT_PROJECT_DEFAULT_LIMIT,
  DEVELOPMENT_PROJECT_DEFAULT_PAGE,
} from '../constants/project.constants';
import { ProjectQueryDto } from '../dto/requests/project-query.dto';
import { ProjectListResponseDto } from '../dto/responses/project-list-response.dto';
import { ProjectMapper } from '../mappers/project.mapper';

@Injectable()
export class ListProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    query: ProjectQueryDto,
  ): Promise<ProjectListResponseDto> {
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
      this.prisma.project.findMany({
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
      }),

      this.prisma.project.count({
        where,
      }),
    ]);

    return {
      data: ProjectMapper.toResponseList(projects),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
