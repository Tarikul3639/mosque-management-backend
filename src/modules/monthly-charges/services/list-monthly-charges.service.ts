import { Injectable } from '@nestjs/common';

import { Prisma } from '@/lib/prisma/client';

import { PrismaService } from '@/common/prisma/prisma.service';
import { getPaymentStatus } from '@/common/utils/get-payment-status.util';
import { PaymentStatus } from '@/common/enums/payment-status.enum';

import { MonthlyChargeQueryDto } from '../dto/requests/monthly-charge-query.dto';
import { MonthlyChargeListResponseDto } from '../dto/responses/monthly-charge-list-response.dto';

@Injectable()
export class ListMonthlyChargesService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    query: MonthlyChargeQueryDto,
  ): Promise<MonthlyChargeListResponseDto> {
    const {
      page = 1,
      limit = 10,
      search,
      familyId,
      year,
      month,
      status,
      activeOnly = true,
      outstandingOnly,
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.MonthlyChargeWhereInput = {
      ...(familyId && {
        familyId,
      }),

      ...(year !== undefined && {
        year,
      }),

      ...(month !== undefined && {
        month,
      }),

      family: {
        ...(activeOnly && {
          isActive: true,
        }),

        ...(search && {
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
        }),
      },
    };

    // ==========================
    // Status filter
    // ==========================

    if (status === PaymentStatus.DUE) {
      where.paidAmount = {
        equals: new Prisma.Decimal(0),
      };
    }

    if (status === PaymentStatus.PAID) {
      where.paidAmount = {
        gte: new Prisma.Decimal(0),
      };
    }

    if (status === PaymentStatus.PARTIAL) {
      where.AND = [
        {
          paidAmount: {
            gt: new Prisma.Decimal(0),
          },
        },
      ];
    }

    const [charges, total] = await Promise.all([
      this.prisma.monthlyCharge.findMany({
        where,
        skip,
        take: limit,

        orderBy: [
          {
            year: 'desc',
          },
          {
            month: 'desc',
          },
          {
            family: {
              familyNo: 'asc',
            },
          },
        ],

        include: {
          family: {
            select: {
              familyNo: true,
              headName: true,
            },
          },
        },
      }),

      this.prisma.monthlyCharge.count({
        where,
      }),
    ]);

    let data = charges.map((charge) => {
      const amount = Number(charge.amount);
      const paidAmount = Number(charge.paidAmount);

      return {
        id: charge.id,

        familyId: charge.familyId,
        familyNo: charge.family.familyNo,
        headName: charge.family.headName,

        year: charge.year,
        month: charge.month,

        amount,
        paidAmount,

        status: getPaymentStatus(amount, paidAmount),

        dueDate: charge.dueDate,
        paidAt: charge.paidAt,

        createdAt: charge.createdAt,
        updatedAt: charge.updatedAt,
      };
    });

    if (status) {
      data = data.filter((item) => item.status === status);
    }

    if (outstandingOnly) {
      data = data.filter((item) => item.status !== PaymentStatus.PAID);
    }

    return {
      data,

      metadata: {
        total,

        page,
        limit,

        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  }
}
