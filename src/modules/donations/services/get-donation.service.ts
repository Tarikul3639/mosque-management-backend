import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { DONATION_MESSAGES } from '../constants/donation.constants';
import { DonationResponseDto } from '../dto/responses/donation-response.dto';

@Injectable()
export class GetDonationService {
    constructor(private readonly prisma: PrismaService) { }

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
                fullName: donation.donor.fullName,
                phone: donation.donor.phone,
                email: donation.donor.email,
                address: donation.donor.address,
            },
            createdBy: donation.createdBy
                ? {
                    id: donation.createdBy.id,
                    fullName: donation.createdBy.fullName,
                }
                : null,
            updatedBy: donation.updatedBy
                ? {
                    id: donation.updatedBy.id,
                    fullName: donation.updatedBy.fullName,
                }
                : null,
            createdAt: donation.createdAt,
            updatedAt: donation.updatedAt,
        };
    }
}