import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { FinancialSummaryDto } from '../dto/responses/financial-summary.dto';
import { FinancialSummaryQueryDto } from '../dto/requests/financial-summary-query.dto';

@Injectable()
export class GetFinancialSummaryService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(query: FinancialSummaryQueryDto): Promise<FinancialSummaryDto> {
        const paymentWhere =
            query.startDate || query.endDate
                ? {
                    paidAt: {
                        ...(query.startDate && {
                            gte: new Date(query.startDate),
                        }),
                        ...(query.endDate && {
                            lte: new Date(query.endDate),
                        }),
                    },
                }
                : {};

        const expenseWhere =
            query.startDate || query.endDate
                ? {
                    expenseDate: {
                        ...(query.startDate && {
                            gte: new Date(query.startDate),
                        }),
                        ...(query.endDate && {
                            lte: new Date(query.endDate),
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
        const expensePercentage =
            totalCollection === 0
                ? 0
                : Number(((totalExpense / totalCollection) * 100).toFixed(2));
        const balancePercentage =
            totalCollection === 0
                ? 0
                : Number(((balance / totalCollection) * 100).toFixed(2));

        return {
            totalCollection,
            totalExpense,
            balance,
            expensePercentage,
            balancePercentage,
        };
    }
}
