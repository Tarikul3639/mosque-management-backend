import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { DonationMapper } from '../mappers/donation.mapper';

import { DONATION_MESSAGES } from '../constants/donation.constants';
import { CreateDonationDto } from '../dto/requests/create-donation.dto';
import { DonationResponseDto } from '../dto/responses/donation-response.dto';

@Injectable()
export class CreateDonationService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    dto: CreateDonationDto,
    userId: string,
  ): Promise<DonationResponseDto> {
    const donor = await this.prisma.donor.findUnique({
      where: {
        id: dto.donorId,
      },
    });

    if (!donor) {
      throw new NotFoundException(DONATION_MESSAGES.DONOR_NOT_FOUND);
    }

    const receiptNo = await this.generateReceiptNo();

    const donation = await this.prisma.donation.create({
      data: {
        donorId: dto.donorId,
        amount: dto.amount,
        purpose: dto.purpose,
        isAnonymous: dto.isAnonymous ?? false,
        paymentMethod: dto.paymentMethod,
        transactionReference: dto.transactionReference,
        note: dto.note,
        donatedAt: dto.donatedAt,
        receiptNo,
        createdById: userId,
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

    return DonationMapper.toResponse(donation);
  }

  private async generateReceiptNo(): Promise<string> {
    const year = new Date().getFullYear();
    const total = await this.prisma.donation.count();
    const serial = String(total + 1).padStart(6, '0');

    return `DON-${year}-${serial}`;
  }
}
