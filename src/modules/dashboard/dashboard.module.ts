import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { DashboardController } from './controllers/dashboard.controller';

import { GetDashboardOverviewService } from './services/get-dashboard-overview.service';
import { GetDashboardSummaryService } from './services/get-dashboard-summary.service';
import { GetFinancialSummaryService } from './services/get-financial-summary.service';
import { GetMonthlyChartService } from './services/get-monthly-chart.service';
import { GetExpenseChartService } from './services/get-expense-chart.service';
import { GetRecentDonationsService } from './services/get-recent-donations.service';
import { GetRecentExpensesService } from './services/get-recent-expenses.service';

@Module({
  imports: [PrismaModule],

  controllers: [DashboardController],

  providers: [
    GetDashboardOverviewService,
    GetDashboardSummaryService,
    GetFinancialSummaryService,
    GetMonthlyChartService,
    GetExpenseChartService,
    GetRecentDonationsService,
    GetRecentExpensesService,
  ],
})
export class DashboardModule {}
