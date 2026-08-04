import { Injectable } from '@nestjs/common';

import { Prisma } from '@/lib/prisma/client';

import { PrismaService } from '@/common/prisma/prisma.service';

import { PaymentSummaryQueryDto } from '../dto/requests/payment-summary-query.dto';
import { PaymentSummaryResponseDto } from '../dto/responses/payment-summary-response.dto';

@Injectable()
export class GetPaymentSummaryService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    query: PaymentSummaryQueryDto,
  ): Promise<PaymentSummaryResponseDto> {
    const { year, month, fromDate, toDate } = query;

    const chargeWhere: Prisma.MonthlyChargeWhereInput = {
      ...(year && { year }),

      ...(month && { month }),

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
          ...(year && { year }),

          ...(month && { month }),
        },
      }),
    };

    const [
      totalFamilies,

      charges,

      paymentCount,

      chargeAggregate,

      paymentAggregate,
    ] = await Promise.all([
      this.prisma.family.count({
        where: {
          isActive: true,
        },
      }),

      this.prisma.monthlyCharge.findMany({
        where: chargeWhere,

        select: {
          amount: true,
          paidAmount: true,
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

    let paidCharges = 0;
    let partialCharges = 0;
    let dueCharges = 0;

    for (const charge of charges) {
      const amount = Number(charge.amount);
      const paidAmount = Number(charge.paidAmount);

      if (paidAmount <= 0) {
        dueCharges++;
      } else if (paidAmount >= amount) {
        paidCharges++;
      } else {
        partialCharges++;
      }
    }

    const totalChargeAmount = Number(chargeAggregate._sum.amount ?? 0);

    const totalPaidAmount = Number(chargeAggregate._sum.paidAmount ?? 0);

    return {
      totalFamilies,

      totalCharges: charges.length,

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
