import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { DashboardSummaryDto } from '../dto/responses/dashboard-summary.dto';

@Injectable()
export class GetDashboardSummaryService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async execute(): Promise<DashboardSummaryDto> {
        const now = new Date();

        const startOfMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1,
        );

        const [
            donation,
            expense,
            monthlyDonation,
            monthlyExpense,
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

            this.prisma.donation.aggregate({
                where: {
                    donatedAt: {
                        gte: startOfMonth,
                    },
                },
                _sum: {
                    amount: true,
                },
            }),

            this.prisma.expense.aggregate({
                where: {
                    expenseDate: {
                        gte: startOfMonth,
                    },
                },
                _sum: {
                    amount: true,
                },
            }),
        ]);

        const totalDonation = Number(
            donation._sum.amount ?? 0,
        );

        const totalExpense = Number(
            expense._sum.amount ?? 0,
        );

        const monthlyDonationAmount = Number(
            monthlyDonation._sum.amount ?? 0,
        );

        const monthlyExpenseAmount = Number(
            monthlyExpense._sum.amount ?? 0,
        );

        return {
            totalDonation,
            totalExpense,
            balance: totalDonation - totalExpense,

            monthlyDonation: monthlyDonationAmount,
            monthlyExpense: monthlyExpenseAmount,
            monthlyBalance:
                monthlyDonationAmount - monthlyExpenseAmount,
        };
    }
}