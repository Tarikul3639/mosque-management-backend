import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { MonthlyChartDto } from '../dto/responses/monthly-chart.dto';

@Injectable()
export class GetMonthlyChartService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(): Promise<MonthlyChartDto[]> {
        const currentYear = new Date().getFullYear();

        const [donations, expenses] = await Promise.all([
            this.prisma.donation.findMany({
                where: {
                    donatedAt: {
                        gte: new Date(currentYear, 0, 1),
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
                        gte: new Date(currentYear, 0, 1),
                    },
                },
                select: {
                    amount: true,
                    expenseDate: true,
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
            expense: 0,
        }));

        donations.forEach((donation) => {
            const month = donation.donatedAt.getMonth();

            result[month].donation += Number(donation.amount);
        });

        expenses.forEach((expense) => {
            const month = expense.expenseDate.getMonth();

            result[month].expense += Number(expense.amount);
        });

        return result;
    }
}
