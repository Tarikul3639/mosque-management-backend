import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../common/prisma/prisma.service';

import { DEVELOPMENT_PROJECT_MESSAGES } from '../constants/project.constants';
import { ProjectResponseDto } from '../dto/responses/project-response.dto';
import { ProjectMapper } from '../mappers/project.mapper';

@Injectable()
export class GetProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(projectId: string): Promise<ProjectResponseDto> {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
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

        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(DEVELOPMENT_PROJECT_MESSAGES.NOT_FOUND);
    }

    return ProjectMapper.toResponse(project);
  }
}
