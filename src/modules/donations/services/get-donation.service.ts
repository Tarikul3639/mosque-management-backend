import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../common/prisma/prisma.service';

import { DONATION_MESSAGES } from '../constants/donation.constants';
import { DonationResponseDto } from '../dto/responses/donation-response.dto';

@Injectable()
export class GetDonationService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<DonationResponseDto> {
    const donation = await this.prisma.donation.findUnique({
      where: {
        id,
      },
      include: {
        donor: true,
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
    });

    if (!donation) {
      throw new NotFoundException(DONATION_MESSAGES.DONATION_NOT_FOUND);
    }

    return {
      id: donation.id,
      amount: Number(donation.amount),
      purpose: donation.purpose,
      isAnonymous: donation.isAnonymous,
      receiptNo: donation.receiptNo,
      paymentMethod: donation.paymentMethod,
      transactionReference: donation.transactionReference,
      note: donation.note,
      donatedAt: donation.donatedAt,
      donor: {
        id: donation.donor.id,
        name: donation.donor.name,
        phone: donation.donor.phone,
        email: donation.donor.email,
        address: donation.donor.address,
      },
      createdBy: donation.createdBy
        ? {
            id: donation.createdBy.id,
            name: donation.createdBy.name,
          }
        : null,
      updatedBy: donation.updatedBy
        ? {
            id: donation.updatedBy.id,
            name: donation.updatedBy.name,
          }
        : null,
      createdAt: donation.createdAt,
      updatedAt: donation.updatedAt,
    };
  }
}
