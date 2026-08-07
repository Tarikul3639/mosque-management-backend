import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../common/prisma/prisma.service';
import { ProjectStatus } from '../../../lib/prisma/client';

import { ProjectSummaryResponseDto } from '../dto/responses/project-summary-response.dto';

@Injectable()
export class GetProjectSummaryService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<ProjectSummaryResponseDto> {
    const [
      totalProjects,
      planningProjects,
      runningProjects,
      completedProjects,
      cancelledProjects,
      budgetAggregate,
      spentAggregate,
    ] = await Promise.all([
      this.prisma.project.count(),

      this.prisma.project.count({
        where: {
          status: ProjectStatus.PLANNING,
        },
      }),

      this.prisma.project.count({
        where: {
          status: ProjectStatus.RUNNING,
        },
      }),

      this.prisma.project.count({
        where: {
          status: ProjectStatus.COMPLETED,
        },
      }),

      this.prisma.project.count({
        where: {
          status: ProjectStatus.CANCELLED,
        },
      }),

      this.prisma.project.aggregate({
        _sum: {
          budget: true,
        },
      }),

      this.prisma.project.aggregate({
        _sum: {
          spent: true,
        },
      }),
    ]);

    return {
      totalProjects,
      planningProjects,
      runningProjects,
      completedProjects,
      cancelledProjects,
      totalBudget: budgetAggregate._sum.budget?.toString() ?? '0',
      totalSpent: spentAggregate._sum.spent?.toString() ?? '0',
    };
  }
}
