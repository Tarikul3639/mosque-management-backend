import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { ProjectStatus } from '@/lib/prisma/client';

import { DevelopmentProjectSummaryResponseDto } from '../dto/responses/development-project-summary-response.dto';

@Injectable()
export class GetDevelopmentProjectSummaryService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<DevelopmentProjectSummaryResponseDto> {
    const [
      totalProjects,
      planningProjects,
      runningProjects,
      completedProjects,
      cancelledProjects,
      budgetAggregate,
      spentAggregate,
    ] = await Promise.all([
      this.prisma.developmentProject.count(),

      this.prisma.developmentProject.count({
        where: {
          status: ProjectStatus.PLANNING,
        },
      }),

      this.prisma.developmentProject.count({
        where: {
          status: ProjectStatus.RUNNING,
        },
      }),

      this.prisma.developmentProject.count({
        where: {
          status: ProjectStatus.COMPLETED,
        },
      }),

      this.prisma.developmentProject.count({
        where: {
          status: ProjectStatus.CANCELLED,
        },
      }),

      this.prisma.developmentProject.aggregate({
        _sum: {
          budget: true,
        },
      }),

      this.prisma.developmentProject.aggregate({
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
