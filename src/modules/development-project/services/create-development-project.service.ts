import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { CreateDevelopmentProjectDto } from '../dto/requests/create-development-project.dto';
import { DevelopmentProjectResponseDto } from '../dto/responses/development-project-response.dto';
import { DevelopmentProjectMapper } from '../mappers/development-project.mapper';

@Injectable()
export class CreateDevelopmentProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    dto: CreateDevelopmentProjectDto,
    userId: string,
  ): Promise<DevelopmentProjectResponseDto> {
    const project = await this.prismaService.developmentProject.create({
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

    return DevelopmentProjectMapper.toResponse(project);
  }
}
