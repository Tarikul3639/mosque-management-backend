import { Expense } from '../../../lib/prisma/client';

import {
  DashboardMetricDto,
  DashboardOverviewDto,
} from '../dto/responses/dashboard-overview.dto';

import { RecentExpenseDto } from '../dto/responses/recent-expense.dto';

interface DashboardOverview {
  donations: DashboardMetricInput;
  expenses: DashboardMetricInput;
  balance: DashboardMetricInput;
  families: DashboardMetricInput;
}

interface DashboardMetricInput {
  total: number;
  growth?: number;
  trend?: DashboardMetricDto['trend'];
}

export class DashboardMapper {
  static toOverviewDto(overview: DashboardOverview): DashboardOverviewDto {
    return {
      donations: this.toMetricDto(overview.donations),
      expenses: this.toMetricDto(overview.expenses),
      balance: this.toMetricDto(overview.balance),
      families: this.toMetricDto(overview.families),
    };
  }

  private static toMetricDto(metric: DashboardMetricInput): DashboardMetricDto {
    return {
      total: metric.total,
      growth: metric.growth ?? 0,
      trend: metric.trend ?? 'neutral',
    };
  }

  static toRecentExpenseDto(expense: Expense): RecentExpenseDto {
    return {
      id: expense.id,
      title: expense.title,
      category: expense.category,
      amount: Number(expense.amount),
      expenseDate: expense.expenseDate,
    };
  }
}
