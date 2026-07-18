import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { PaymentStatus, Prisma } from '@/lib/prisma/client';

import { PaymentSummaryQueryDto } from '../dto/requests/payment-summary-query.dto';
import { PaymentSummaryResponseDto } from '../dto/responses/payment-summary-response.dto';

@Injectable()
export class GetPaymentSummaryService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(
        query: PaymentSummaryQueryDto,
    ): Promise<PaymentSummaryResponseDto> {
        const { year, month, fromDate, toDate } = query;

        const chargeWhere: Prisma.MonthlyChargeWhereInput = {
            ...(year && {
                year,
            }),

            ...(month && {
                month,
            }),

            ...((fromDate || toDate) && {
                createdAt: {
                    ...(fromDate && {
                        gte: new Date(fromDate),
                    }),

                    ...(toDate && {
                        lte: new Date(toDate),
                    }),
                },
            }),
        };

        const paymentWhere: Prisma.PaymentWhereInput = {
            ...((fromDate || toDate) && {
                paidAt: {
                    ...(fromDate && {
                        gte: new Date(fromDate),
                    }),

                    ...(toDate && {
                        lte: new Date(toDate),
                    }),
                },
            }),

            ...((year || month) && {
                monthlyCharge: {
                    ...(year && {
                        year,
                    }),

                    ...(month && {
                        month,
                    }),
                },
            }),
        };

        const [
            totalFamilies,
            totalCharges,
            paidCharges,
            partialCharges,
            dueCharges,
            paymentCount,
            chargeAggregate,
            paymentAggregate,
        ] = await Promise.all([
            this.prisma.family.count({
                where: {
                    isActive: true,
                },
            }),

            this.prisma.monthlyCharge.count({
                where: chargeWhere,
            }),

            this.prisma.monthlyCharge.count({
                where: {
                    ...chargeWhere,
                    status: PaymentStatus.PAID,
                },
            }),

            this.prisma.monthlyCharge.count({
                where: {
                    ...chargeWhere,
                    status: PaymentStatus.PARTIAL,
                },
            }),

            this.prisma.monthlyCharge.count({
                where: {
                    ...chargeWhere,
                    status: PaymentStatus.DUE,
                },
            }),

            this.prisma.payment.count({
                where: paymentWhere,
            }),

            this.prisma.monthlyCharge.aggregate({
                where: chargeWhere,
                _sum: {
                    amount: true,
                    paidAmount: true,
                },
            }),

            this.prisma.payment.aggregate({
                where: paymentWhere,
                _avg: {
                    amount: true,
                },
            }),
        ]);

        const totalChargeAmount = Number(chargeAggregate._sum.amount ?? 0);

        const totalPaidAmount = Number(chargeAggregate._sum.paidAmount ?? 0);

        return {
            totalFamilies,

            totalCharges,

            paidCharges,
            partialCharges,
            dueCharges,

            totalChargeAmount,

            totalPaidAmount,

            totalDueAmount: totalChargeAmount - totalPaidAmount,

            totalPayments: paymentCount,

            averagePayment: Number(paymentAggregate._avg.amount ?? 0),
        };
    }
}
