import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { MonthlyChartDto } from '../dto/responses/monthly-chart.dto';
import { DashboardQueryDto } from '../dto/requests/dashboard-query.dto';

@Injectable()
export class GetMonthlyChartService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: DashboardQueryDto): Promise<MonthlyChartDto[]> {
    const currentYear = new Date().getFullYear();

    const from = query.from
      ? new Date(query.from)
      : new Date(currentYear, 0, 1);

    const to = query.to ? new Date(query.to) : new Date(currentYear + 1, 0, 1);

    const [donations, expenses, collections] = await Promise.all([
      this.prisma.donation.findMany({
        where: {
          donatedAt: {
            gte: from,
            lt: to,
          },
        },
        select: {
          amount: true,
          donatedAt: true,
        },
      }),

      this.prisma.expense.findMany({
        where: {
          expenseDate: {
            gte: from,
            lt: to,
          },
        },
        select: {
          amount: true,
          expenseDate: true,
        },
      }),

      this.prisma.payment.findMany({
        where: {
          paidAt: {
            gte: from,
            lt: to,
          },
        },
        select: {
          amount: true,
          paidAt: true,
        },
      }),
    ]);

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const result: MonthlyChartDto[] = months.map((month) => ({
      month,
      donation: 0,
      collection: 0,
      expense: 0,
    }));

    donations.forEach((donation) => {
      result[donation.donatedAt.getMonth()].donation += Number(donation.amount);
    });

    expenses.forEach((expense) => {
      result[expense.expenseDate.getMonth()].expense += Number(expense.amount);
    });

    collections.forEach((collection) => {
      result[collection.paidAt.getMonth()].collection += Number(
        collection.amount,
      );
    });

    return result;
  }
}
