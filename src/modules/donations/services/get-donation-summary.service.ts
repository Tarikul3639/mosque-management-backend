import { Injectable } from '@nestjs/common';

import { Prisma } from '@/lib/prisma/client';
import { PrismaService } from '@/common/prisma/prisma.service';

import { DonationSummaryQueryDto } from '../dto/requests/donation-summary-query.dto';
import { DonationSummaryResponseDto } from '../dto/responses/donation-summary-response.dto';

@Injectable()
export class GetDonationSummaryService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    query: DonationSummaryQueryDto,
  ): Promise<DonationSummaryResponseDto> {
    const where: Prisma.DonationWhereInput = {};

    if (query.fromDate || query.toDate) {
      where.donatedAt = {};

      if (query.fromDate) {
        where.donatedAt.gte = new Date(query.fromDate);
      }

      if (query.toDate) {
        where.donatedAt.lte = new Date(query.toDate);
      }
    }

    if (query.paymentMethod) {
      where.paymentMethod = query.paymentMethod;
    }

    const [totalDonations, aggregate] = await Promise.all([
      this.prisma.donation.count({
        where,
      }),

      this.prisma.donation.aggregate({
        where,
        _sum: {
          amount: true,
        },
        _avg: {
          amount: true,
        },
      }),
    ]);

    return {
      totalDonations,
      totalAmount: Number(aggregate._sum.amount ?? 0),
      averageAmount: Number(aggregate._avg.amount ?? 0),
    };
  }
}
