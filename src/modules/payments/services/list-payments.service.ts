import { Injectable } from '@nestjs/common';

import { Prisma } from '@/lib/prisma/client';
import { PrismaService } from '@/common/prisma/prisma.service';

import { PaymentQueryDto } from '../dto/requests/payment-query.dto';
import { PaymentListResponseDto } from '../dto/responses/payment-list-response.dto';
import { getPaymentStatus } from '@/common/utils/get-payment-status.util';

@Injectable()
export class ListPaymentsService {
  constructor(private readonly prisma: PrismaService) { }

  async execute(query: PaymentQueryDto): Promise<PaymentListResponseDto> {
    const {
      page = 1,
      limit = 10,
      search,
      familyId,
      year,
      month,
      method,
      fromDate,
      toDate,
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.PaymentWhereInput = {
      ...(familyId && {
        familyId,
      }),

      ...(method && {
        method,
      }),

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

      ...(search && {
        family: {
          OR: [
            {
              familyNo: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              headName: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
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

    const [payments, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          paidAt: 'desc',
        },
        include: {
          family: {
            select: {
              familyNo: true,
              headName: true,
            },
          },
          monthlyCharge: {
            select: {
              year: true,
              month: true,
              amount: true,
              paidAmount: true,
            },
          },
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
          updatedBy: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),

      this.prisma.payment.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: payments.map((payment) => ({
        id: payment.id,

        familyId: payment.familyId,
        familyNo: payment.family.familyNo,
        headName: payment.family.headName,

        monthlyChargeId: payment.monthlyChargeId,

        year: payment.monthlyCharge.year,
        month: payment.monthlyCharge.month,

        chargeAmount: Number(payment.monthlyCharge.amount),

        paymentAmount: Number(payment.amount),

        paidAmount: Number(payment.monthlyCharge.paidAmount),

        status: getPaymentStatus(
          Number(payment.monthlyCharge.amount),
          Number(payment.monthlyCharge.paidAmount),
        ),

        method: payment.method,

        reference: payment.reference,
        note: payment.note,

        paidAt: payment.paidAt,

        createdBy: {
          id: payment.createdBy?.id ?? '',
          name: payment.createdBy?.name ?? '',
        },
        updatedBy: {
          id: payment.updatedBy?.id ?? '',
          name: payment.updatedBy?.name ?? '',
        },

        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
      })),

      meta: {
        total,
        page,
        limit,
        totalPages,

        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}