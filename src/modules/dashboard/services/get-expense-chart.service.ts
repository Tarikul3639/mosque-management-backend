import { Injectable } from '@nestjs/common';
import { ExpenseCategory } from '@/lib/prisma/client';
import { PrismaService } from '@/common/prisma/prisma.service';
import { DashboardQueryDto } from '../dto/requests/dashboard-query.dto';
import { ExpenseChartDto } from '../dto/responses/expense-chart.dto';

@Injectable()
export class GetExpenseChartService {
    constructor(private readonly prisma: PrismaService) {}

    async execute(query: DashboardQueryDto): Promise<ExpenseChartDto[]> {
        const currentYear = new Date().getFullYear();

        const from = query.from
            ? new Date(query.from)
            : new Date(currentYear, 0, 1);

        const to = query.to
            ? new Date(query.to)
            : new Date(currentYear + 1, 0, 1);

        const expenses = await this.prisma.expense.groupBy({
            by: ['category'],

            where: {
                expenseDate: {
                    gte: from,
                    lt: to,
                },
            },

            _sum: {
                amount: true,
            },

            orderBy: {
                category: 'asc',
            },
        });

        return expenses.map((expense) => ({
            category: this.formatCategory(expense.category),
            amount: Number(expense._sum.amount ?? 0),
        }));
    }

    private formatCategory(category: ExpenseCategory): string {
        return category
            .toLowerCase()
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}