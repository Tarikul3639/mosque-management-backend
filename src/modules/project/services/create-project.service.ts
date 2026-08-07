import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../common/prisma/prisma.service';

import { CreateProjectDto } from '../dto/requests/create-project.dto';
import { ProjectResponseDto } from '../dto/responses/project-response.dto';
import { ProjectMapper } from '../mappers/project.mapper';

@Injectable()
export class CreateProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    dto: CreateProjectDto,
    userId: string,
  ): Promise<ProjectResponseDto> {
    const project = await this.prismaService.project.create({
      data: {
        title: dto.title,
        description: dto.description,
        budget: dto.budget,
        spent: dto.spent ?? 0,
        progress: dto.progress ?? 0,
        status: dto.status,

        images: dto.imageIds?.length
          ? {
              connect: dto.imageIds.map((id) => ({
                id,
              })),
            }
          : undefined,

        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,

        createdById: userId,
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
