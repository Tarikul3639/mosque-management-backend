import { Prisma } from '@/lib/prisma/client';
import { DevelopmentProjectResponseDto } from '../dto/responses/development-project-response.dto';

type DevelopmentProjectWithUsers = Prisma.DevelopmentProjectGetPayload<{
    include: {
        createdBy: {
            select: {
                id: true;
                fullName: true;
            };
        };
        updatedBy: {
            select: {
                id: true;
                fullName: true;
            };
        };
    };
}>;

export class DevelopmentProjectMapper {
    static toResponse(
        project: DevelopmentProjectWithUsers,
    ): DevelopmentProjectResponseDto {
        return {
            id: project.id,

            title: project.title,
            description: project.description,

            budget: project.budget?.toString() ?? '0',
            spent: project.spent?.toString() ?? '0',

            progress: project.progress,

            image: project.image,

            status: project.status,

            startDate: project.startDate,
            endDate: project.endDate,

            createdBy: project.createdBy
                ? {
                    id: project.createdBy.id,
                    fullName: project.createdBy.fullName,
                }
                : null,

            updatedBy: project.updatedBy
                ? {
                    id: project.updatedBy.id,
                    fullName: project.updatedBy.fullName,
                }
                : null,

            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
        };
    }

    static toResponseList(
        projects: DevelopmentProjectWithUsers[],
    ): DevelopmentProjectResponseDto[] {
        return projects.map((project) =>
            DevelopmentProjectMapper.toResponse(project),
        );
    }
}
