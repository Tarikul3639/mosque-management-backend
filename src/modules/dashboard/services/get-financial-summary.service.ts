import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { FinancialSummaryDto } from '../dto/responses/financial-summary.dto';
import { DashboardQueryDto } from '../dto/requests/dashboard-query.dto';

@Injectable()
export class GetFinancialSummaryService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(query: DashboardQueryDto): Promise<FinancialSummaryDto> {
        const paymentWhere =
            query.from || query.to
                ? {
                    paidAt: {
                        ...(query.from && {
                            gte: new Date(query.from),
                        }),
                        ...(query.to && {
                            lte: new Date(query.to),
                        }),
                    },
                }
                : {};

        const expenseWhere =
            query.from || query.to
                ? {
                    expenseDate: {
                        ...(query.from && {
                            gte: new Date(query.from),
                        }),
                        ...(query.to && {
                            lte: new Date(query.to),
                        }),
                    },
                }
                : {};

        const [paymentAggregate, expenseAggregate] = await Promise.all([
            this.prisma.payment.aggregate({
                where: paymentWhere,
                _sum: {
                    amount: true,
                },
            }),

            this.prisma.expense.aggregate({
                where: expenseWhere,
                _sum: {
                    amount: true,
                },
            }),
        ]);

        const totalCollection = Number(paymentAggregate._sum.amount ?? 0);
        const totalExpense = Number(expenseAggregate._sum.amount ?? 0);
        const balance = totalCollection - totalExpense;

        const maxValue = Math.max(
            totalCollection,
            totalExpense,
            Math.abs(balance),
            1,
        );

        const collectionPercentage = Number(
            ((totalCollection / maxValue) * 100).toFixed(2),
        );

        const expensePercentage = Number(
            ((totalExpense / maxValue) * 100).toFixed(2),
        );

        const balancePercentage = Number(
            ((Math.abs(balance) / maxValue) * 100).toFixed(2),
        );

        return {
            totalCollection,
            totalExpense,
            balance,

            collectionPercentage,
            expensePercentage,
            balancePercentage,
        };
    }
}
