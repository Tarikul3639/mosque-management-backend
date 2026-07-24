import { Injectable } from '@nestjs/common';
import { ExpenseCategory } from '@/lib/prisma/client';
import { PrismaService } from '@/common/prisma/prisma.service';
import { ExpenseChartDto } from '../dto/responses/expense-chart.dto';

@Injectable()
export class GetExpenseChartService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(): Promise<ExpenseChartDto[]> {
        const expenses = await this.prisma.expense.groupBy({
            by: ['category'],

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
