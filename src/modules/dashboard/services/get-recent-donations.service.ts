import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { RecentDonationDto } from '../dto/responses/recent-donation.dto';

@Injectable()
export class GetRecentDonationsService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(limit = 5): Promise<RecentDonationDto[]> {
    const donations = await this.prisma.donation.findMany({
      take: limit,

      orderBy: {
        donatedAt: 'desc',
      },

      include: {
        donor: {
          select: {
            name: true,
          },
        },
      },
    });

    return donations.map((donation) => ({
      id: donation.id,
      donorName: donation.donor.name,
      amount: Number(donation.amount),
      receiptNo: donation.receiptNo,
      paymentMethod: donation.paymentMethod,
      donatedAt: donation.donatedAt,
    }));
  }
}
