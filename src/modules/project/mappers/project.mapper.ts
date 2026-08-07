import { Prisma } from '@/lib/prisma/client';
import { ProjectResponseDto } from '../dto/responses/project-response.dto';

type ProjectWithUsers = Prisma.ProjectGetPayload<{
  include: {
    images: {
      select: {
        id: true;
        url: true;
      };
    };
    createdBy: {
      select: {
        id: true;
        name: true;
      };
    };
    updatedBy: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

export class ProjectMapper {
  static toResponse(project: ProjectWithUsers): ProjectResponseDto {
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      budget: project.budget?.toString() ?? '0',
      spent: project.spent?.toString() ?? '0',
      progress: project.progress,
      images: project.images.map((image) => ({
        id: image.id,
        url: image.url,
      })),
      status: project.status,
      startDate: project.startDate,
      endDate: project.endDate,
      createdBy: project.createdBy
        ? {
            id: project.createdBy.id,
            name: project.createdBy.name,
          }
        : null,

      updatedBy: project.updatedBy
        ? {
            id: project.updatedBy.id,
            name: project.updatedBy.name,
          }
        : null,

      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  static toResponseList(projects: ProjectWithUsers[]): ProjectResponseDto[] {
    return projects.map((project) => ProjectMapper.toResponse(project));
  }
}
