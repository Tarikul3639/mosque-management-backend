import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { DONATION_MESSAGES } from '../constants/donation.constants';

@Injectable()
export class DeleteDonationService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<void> {
    const donation = await this.prisma.donation.findUnique({
      where: {
        id,
      },
    });

    if (!donation) {
      throw new NotFoundException(DONATION_MESSAGES.DONATION_NOT_FOUND);
    }

    await this.prisma.donation.delete({
      where: {
        id,
      },
    });
  }
}
