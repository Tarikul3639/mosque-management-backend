import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { ExpenseSummaryResponseDto } from '../dto/responses/expense-summary-response.dto';

@Injectable()
export class GetExpenseSummaryService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<ExpenseSummaryResponseDto> {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    const [totalExpenses, totalAmount, currentMonthAmount, currentYearAmount] =
      await Promise.all([
        this.prisma.expense.count(),

        this.prisma.expense.aggregate({
          _sum: {
            amount: true,
          },
        }),

        this.prisma.expense.aggregate({
          where: {
            expenseDate: {
              gte: monthStart,
            },
          },
          _sum: {
            amount: true,
          },
        }),

        this.prisma.expense.aggregate({
          where: {
            expenseDate: {
              gte: yearStart,
            },
          },
          _sum: {
            amount: true,
          },
        }),
      ]);

    return {
      totalExpenses,
      totalAmount: totalAmount._sum.amount?.toString() ?? '0',
      currentMonthAmount: currentMonthAmount._sum.amount?.toString() ?? '0',
      currentYearAmount: currentYearAmount._sum.amount?.toString() ?? '0',
    };
  }
}
