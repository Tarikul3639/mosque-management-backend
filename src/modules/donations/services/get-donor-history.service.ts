import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { DONATION_MESSAGES } from '../constants/donation.constants';

import { DonorHistoryQueryDto } from '../dto/requests/donor-history-query.dto';
import { DonorHistoryResponseDto } from '../dto/responses/donor-history-response.dto';

@Injectable()
export class GetDonorHistoryService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(query: DonorHistoryQueryDto): Promise<DonorHistoryResponseDto> {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;

        const donor = await this.prisma.donor.findUnique({
            where: {
                id: query.donorId,
            },
        });

        if (!donor) {
            throw new NotFoundException(DONATION_MESSAGES.DONOR_NOT_FOUND);
        }

        const [donations, aggregate] = await Promise.all([
            this.prisma.donation.findMany({
                where: {
                    donorId: query.donorId,
                },
                orderBy: {
                    donatedAt: 'desc',
                },
                skip,
                take: limit,
            }),

            this.prisma.donation.aggregate({
                where: {
                    donorId: query.donorId,
                },
                _count: true,
                _sum: {
                    amount: true,
                },
            }),
        ]);

        return {
            donor: {
                id: donor.id,
                fullName: donor.fullName,
                phone: donor.phone,
                email: donor.email,
                address: donor.address,
            },

            totalDonations: aggregate._count,

            totalAmount: Number(aggregate._sum.amount ?? 0),

            donations: donations.map((donation) => ({
                id: donation.id,
                receiptNo: donation.receiptNo,
                amount: Number(donation.amount),
                purpose: donation.purpose,
                paymentMethod: donation.paymentMethod,
                donatedAt: donation.donatedAt,
            })),
        };
    }
}
