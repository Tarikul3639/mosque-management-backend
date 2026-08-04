import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { UserRole } from '@/lib/prisma/client';

import { DEVELOPMENT_PROJECT_MESSAGES } from '../constants/project.constants';
import { UpdateProjectDto } from '../dto/requests/update-project.dto';
import { ProjectResponseDto } from '../dto/responses/project-response.dto';
import { ProjectMapper } from '../mappers/project.mapper';

@Injectable()
export class UpdateProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    projectId: string,
    dto: UpdateProjectDto,
    userId: string,
    role: UserRole,
  ): Promise<ProjectResponseDto> {
    const existingProject = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        id: true,
        createdById: true,
      },
    });

    if (!existingProject) {
      throw new NotFoundException(DEVELOPMENT_PROJECT_MESSAGES.NOT_FOUND);
    }

    const isOwner = existingProject.createdById === userId;

    const isSuperAdmin = role === UserRole.SUPER_ADMIN;

    if (!isOwner && !isSuperAdmin) {
      throw new ForbiddenException(DEVELOPMENT_PROJECT_MESSAGES.FORBIDDEN);
    }

    const project = await this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        ...(dto.title !== undefined && {
          title: dto.title,
        }),

        ...(dto.description !== undefined && {
          description: dto.description,
        }),

        ...(dto.budget !== undefined && {
          budget: dto.budget,
        }),

        ...(dto.spent !== undefined && {
          spent: dto.spent,
        }),

        ...(dto.progress !== undefined && {
          progress: dto.progress,
        }),

        ...(dto.status !== undefined && {
          status: dto.status,
        }),

        ...(dto.startDate !== undefined && {
          startDate: dto.startDate ? new Date(dto.startDate) : null,
        }),

        ...(dto.endDate !== undefined && {
          endDate: dto.endDate ? new Date(dto.endDate) : null,
        }),

        ...(dto.imageIds !== undefined && {
          images: {
            set: [],
            connect: dto.imageIds.map((id) => ({
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

    return ProjectMapper.toResponse(project);
  }
}
