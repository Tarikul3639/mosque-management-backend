import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { DashboardMapper } from '../mappers/dashboard.mapper';
import { RecentExpenseDto } from '../dto/responses/recent-expense.dto';

@Injectable()
export class GetRecentExpensesService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(limit = 5): Promise<RecentExpenseDto[]> {
        const expenses = await this.prisma.expense.findMany({
            take: limit,

            orderBy: {
                expenseDate: 'desc',
            },
        });

        return expenses.map((expense) =>
            DashboardMapper.toRecentExpenseDto(expense),
        );
    }
}
