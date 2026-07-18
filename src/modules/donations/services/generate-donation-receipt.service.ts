import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { DonationMapper } from '../mappers/donation.mapper';

import { DONATION_MESSAGES } from '../constants/donation.constants';
import { DonationReceiptResponseDto } from '../dto/responses/donation-receipt-response.dto';

@Injectable()
export class GenerateDonationReceiptService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(id: string): Promise<DonationReceiptResponseDto> {
        const donation = await this.prisma.donation.findUnique({
            where: {
                id,
            },
            include: {
                donor: true,
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
                updatedBy: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
            },
        });

        if (!donation) {
            throw new NotFoundException(DONATION_MESSAGES.DONATION_NOT_FOUND);
        }

        return DonationMapper.toResponse(donation);
    }
}
