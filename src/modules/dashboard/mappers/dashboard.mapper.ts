import { Expense } from '@/lib/prisma/client';
import { DashboardOverviewDto } from '../dto/responses/dashboard-overview.dto';
import { RecentExpenseDto } from '../dto/responses/recent-expense.dto';

interface DashboardOverview {
  totalFamilies: number;
  activeFamilies: number;
  totalDonors: number;
  activeDonors: number;
  totalCommitteeMembers: number;
  totalDonations: number;
  totalExpenses: number;
  runningProjects: number;
}

export class DashboardMapper {
  static toOverviewDto(overview: DashboardOverview): DashboardOverviewDto {
    return {
      totalFamilies: overview.totalFamilies,
      activeFamilies: overview.activeFamilies,

      totalDonors: overview.totalDonors,
      activeDonors: overview.activeDonors,

      totalCommitteeMembers: overview.totalCommitteeMembers,

      totalDonations: overview.totalDonations,
      totalExpenses: overview.totalExpenses,

      runningProjects: overview.runningProjects,
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
