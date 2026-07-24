import {
    Controller,
    Get,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { Roles } from '@/common/decorators/roles.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { UserRole } from '@/lib/prisma/client';

import { FinancialSummaryQueryDto } from '../dto/requests/financial-summary-query.dto';

import { DashboardOverviewDto } from '../dto/responses/dashboard-overview.dto';
import { DashboardSummaryDto } from '../dto/responses/dashboard-summary.dto';
import { FinancialSummaryDto } from '../dto/responses/financial-summary.dto';
import { MonthlyChartDto } from '../dto/responses/monthly-chart.dto';
import { ExpenseChartDto } from '../dto/responses/expense-chart.dto';
import { RecentDonationDto } from '../dto/responses/recent-donation.dto';
import { RecentExpenseDto } from '../dto/responses/recent-expense.dto';
import { DashboardOverviewQueryDto } from '../dto/requests/dashboard-overview-query.dto';

import { GetDashboardOverviewService } from '../services/get-dashboard-overview.service';
import { GetDashboardSummaryService } from '../services/get-dashboard-summary.service';
import { GetFinancialSummaryService } from '../services/get-financial-summary.service';
import { GetMonthlyChartService } from '../services/get-monthly-chart.service';
import { GetExpenseChartService } from '../services/get-expense-chart.service';
import { GetRecentDonationsService } from '../services/get-recent-donations.service';
import { GetRecentExpensesService } from '../services/get-recent-expenses.service';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
    constructor(
        private readonly getDashboardOverviewService: GetDashboardOverviewService,
        private readonly getDashboardSummaryService: GetDashboardSummaryService,
        private readonly getFinancialSummaryService: GetFinancialSummaryService,
        private readonly getMonthlyChartService: GetMonthlyChartService,
        private readonly getExpenseChartService: GetExpenseChartService,
        private readonly getRecentDonationsService: GetRecentDonationsService,
        private readonly getRecentExpensesService: GetRecentExpensesService,
    ) { }

    // -----------------------------
    // Protected APIs
    // -----------------------------

    @Get('overview')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @ApiOperation({
        summary: 'Get dashboard overview',
    })
    @ApiResponse({
        status: 200,
        type: DashboardOverviewDto,
    })
    async getOverview(
        @Query() query: DashboardOverviewQueryDto,
    ): Promise<DashboardOverviewDto> {
        return this.getDashboardOverviewService.execute(query);
    }

    @Get('summary')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @ApiOperation({
        summary: 'Get dashboard summary',
    })
    @ApiResponse({
        status: 200,
        type: DashboardSummaryDto,
    })
    async getSummary(): Promise<DashboardSummaryDto> {
        return this.getDashboardSummaryService.execute();
    }

    @Get('financial-summary')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @ApiBearerAuth()
    // @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @ApiOperation({
        summary: 'Get financial summary',
    })
    @ApiResponse({
        status: 200,
        type: FinancialSummaryDto,
    })
    async getFinancialSummary(
        @Query() query: FinancialSummaryQueryDto,
    ): Promise<FinancialSummaryDto> {
        return this.getFinancialSummaryService.execute(query);
    }

    @Get('monthly-chart')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @ApiOperation({
        summary: 'Get monthly chart',
    })
    @ApiResponse({
        status: 200,
        type: MonthlyChartDto,
        isArray: true,
    })
    async getMonthlyChart(): Promise<MonthlyChartDto[]> {
        return this.getMonthlyChartService.execute();
    }

    @Get('expense-chart')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @ApiOperation({
        summary: 'Get expense chart',
    })
    @ApiResponse({
        status: 200,
        type: ExpenseChartDto,
        isArray: true,
    })
    async getExpenseChart(): Promise<ExpenseChartDto[]> {
        return this.getExpenseChartService.execute();
    }

    @Get('recent-donations')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @ApiOperation({
        summary: 'Get recent donations',
    })
    @ApiResponse({
        status: 200,
        type: RecentDonationDto,
        isArray: true,
    })
    async getRecentDonations(): Promise<RecentDonationDto[]> {
        return this.getRecentDonationsService.execute();
    }

    @Get('recent-expenses')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
    @ApiOperation({
        summary: 'Get recent expenses',
    })
    @ApiResponse({
        status: 200,
        type: RecentExpenseDto,
        isArray: true,
    })
    async getRecentExpenses(): Promise<RecentExpenseDto[]> {
        return this.getRecentExpensesService.execute();
    }
}