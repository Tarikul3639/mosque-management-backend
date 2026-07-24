import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { calculateGrowth } from '@/common/utils/calculate-growth';

import { DashboardOverviewQueryDto } from '../dto/requests/dashboard-overview-query.dto';
import { DashboardOverviewDto } from '../dto/responses/dashboard-overview.dto';
import { DashboardMapper } from '../mappers/dashboard.mapper';

@Injectable()
export class GetDashboardOverviewService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async execute(
        query: DashboardOverviewQueryDto,
    ): Promise<DashboardOverviewDto> {
        if (query.from && query.to) {
            return this.getOverviewByDateRange(
                new Date(query.from),
                new Date(query.to),
            );
        }

        return this.getAllTimeOverview();
    }

    private async getAllTimeOverview(): Promise<DashboardOverviewDto> {
        const now = new Date();

        const currentMonthStart = new Date(
            now.getFullYear(),
            now.getMonth(),
            1,
        );

        const currentMonthEnd = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0,
            23,
            59,
            59,
            999,
        );

        const previousMonthStart = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            1,
        );

        const previousMonthEnd = new Date(
            now.getFullYear(),
            now.getMonth(),
            0,
            23,
            59,
            59,
            999,
        );

        const [
            totalDonations,
            totalExpenses,
            totalFamilies,

            currentDonations,
            previousDonations,

            currentExpenses,
            previousExpenses,

            currentFamilies,
            previousFamilies,
        ] = await Promise.all([
            this.prisma.donation.aggregate({
                _sum: {
                    amount: true,
                },
            }),

            this.prisma.expense.aggregate({
                _sum: {
                    amount: true,
                },
            }),

            this.prisma.family.count({
                where: {
                    isActive: true,
                },
            }),

            this.prisma.donation.aggregate({
                where: {
                    donatedAt: {
                        gte: currentMonthStart,
                        lte: currentMonthEnd,
                    },
                },
                _sum: {
                    amount: true,
                },
            }),

            this.prisma.donation.aggregate({
                where: {
                    donatedAt: {
                        gte: previousMonthStart,
                        lte: previousMonthEnd,
                    },
                },
                _sum: {
                    amount: true,
                },
            }),

            this.prisma.expense.aggregate({
                where: {
                    expenseDate: {
                        gte: currentMonthStart,
                        lte: currentMonthEnd,
                    },
                },
                _sum: {
                    amount: true,
                },
            }),

            this.prisma.expense.aggregate({
                where: {
                    expenseDate: {
                        gte: previousMonthStart,
                        lte: previousMonthEnd,
                    },
                },
                _sum: {
                    amount: true,
                },
            }),

            this.prisma.family.count({
                where: {
                    isActive: true,
                    createdAt: {
                        lte: currentMonthEnd,
                    },
                },
            }),

            this.prisma.family.count({
                where: {
                    isActive: true,
                    createdAt: {
                        lte: previousMonthEnd,
                    },
                },
            }),
        ]);

        const donationTotal = Number(
            totalDonations._sum.amount ?? 0,
        );

        const expenseTotal = Number(
            totalExpenses._sum.amount ?? 0,
        );

        const balanceTotal =
            donationTotal - expenseTotal;

        const currentDonation = Number(
            currentDonations._sum.amount ?? 0,
        );

        const previousDonation = Number(
            previousDonations._sum.amount ?? 0,
        );

        const currentExpense = Number(
            currentExpenses._sum.amount ?? 0,
        );

        const previousExpense = Number(
            previousExpenses._sum.amount ?? 0,
        );

        const currentBalance =
            currentDonation - currentExpense;

        const previousBalance =
            previousDonation - previousExpense;

        return DashboardMapper.toOverviewDto({
            donations: {
                total: donationTotal,
                ...calculateGrowth(
                    currentDonation,
                    previousDonation,
                ),
            },

            expenses: {
                total: expenseTotal,
                ...calculateGrowth(
                    currentExpense,
                    previousExpense,
                ),
            },

            balance: {
                total: balanceTotal,
                ...calculateGrowth(
                    currentBalance,
                    previousBalance,
                ),
            },

            families: {
                total: totalFamilies,
                ...calculateGrowth(
                    currentFamilies,
                    previousFamilies,
                ),
            },
        });
    }

    private async getOverviewByDateRange(
        from: Date,
        to: Date,
    ): Promise<DashboardOverviewDto> {
        const [
            donations,
            expenses,
            families,
        ] = await Promise.all([
            this.prisma.donation.aggregate({
                where: {
                    donatedAt: {
                        gte: from,
                        lte: to,
                    },
                },
                _sum: {
                    amount: true,
                },
            }),

            this.prisma.expense.aggregate({
                where: {
                    expenseDate: {
                        gte: from,
                        lte: to,
                    },
                },
                _sum: {
                    amount: true,
                },
            }),

            this.prisma.family.count({
                where: {
                    isActive: true,
                    createdAt: {
                        lte: to,
                    },
                },
            }),
        ]);

        const donationTotal = Number(
            donations._sum.amount ?? 0,
        );

        const expenseTotal = Number(
            expenses._sum.amount ?? 0,
        );

        return DashboardMapper.toOverviewDto({
            donations: {
                total: donationTotal,
                growth: 100,
                trend: 'neutral',
            },

            expenses: {
                total: expenseTotal,
                growth: 100,
                trend: 'neutral',
            },

            balance: {
                total: donationTotal - expenseTotal,
                growth: 100,
                trend: 'neutral',
            },

            families: {
                total: families,
                growth: 100,
                trend: 'neutral',
            },
        });
    }
}