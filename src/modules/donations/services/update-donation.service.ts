import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { DonationMapper } from '../mappers/donation.mapper';

import { DONATION_MESSAGES } from '../constants/donation.constants';
import { UpdateDonationDto } from '../dto/requests/update-donation.dto';
import { DonationResponseDto } from '../dto/responses/donation-response.dto';

@Injectable()
export class UpdateDonationService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(
        id: string,
        dto: UpdateDonationDto,
        userId: string,
    ): Promise<DonationResponseDto> {
        console.log("UpdateDonationService.execute called with id:", id, "dto:", dto, "userId:", userId);
        const donation = await this.prisma.donation.findUnique({
            where: {
                id,
            },
        });

        if (!donation) {
            throw new NotFoundException(DONATION_MESSAGES.DONATION_NOT_FOUND);
        }

        if (dto.donorId) {
            const donor = await this.prisma.donor.findUnique({
                where: {
                    id: dto.donorId,
                },
            });

            if (!donor) {
                throw new NotFoundException(DONATION_MESSAGES.DONOR_NOT_FOUND);
            }
        }

        const updatedDonation = await this.prisma.donation.update({
            where: {
                id,
            },
            data: {
                donorId: dto.donorId,
                amount: dto.amount,
                purpose: dto.purpose,
                isAnonymous: dto.isAnonymous,
                paymentMethod: dto.paymentMethod,
                transactionReference: dto.transactionReference,
                note: dto.note,
                donatedAt: dto.donatedAt ? new Date(dto.donatedAt) : undefined,
                updatedById: userId,
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

        return DonationMapper.toResponse(updatedDonation);
    }
}