import { Injectable } from '@nestjs/common';
import { Prisma } from '@/lib/prisma/client';

import { PrismaService } from '@/common/prisma/prisma.service';
import { DonationMapper } from '../mappers/donation.mapper';

import { DonationQueryDto } from '../dto/requests/donation-query.dto';
import { DonationListResponseDto } from '../dto/responses/donation-list-response.dto';

@Injectable()
export class ListDonationsService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(query: DonationQueryDto): Promise<DonationListResponseDto> {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;

        const where: Prisma.DonationWhereInput = {};

        if (query.search) {
            where.OR = [
                {
                    donor: {
                        name: {
                            contains: query.search,
                            mode: 'insensitive',
                        },
                    },
                },
                {
                    donor: {
                        phone: {
                            contains: query.search,
                        },
                    },
                },
                {
                    receiptNo: {
                        contains: query.search,
                        mode: 'insensitive',
                    },
                },
            ];
        }

        if (query.paymentMethod) {
            where.paymentMethod = query.paymentMethod;
        }

        if (query.fromDate || query.toDate) {
            where.donatedAt = {};
            if (query.fromDate) {
                where.donatedAt.gte = new Date(query.fromDate);
            }
            if (query.toDate) {
                where.donatedAt.lte = new Date(query.toDate);
            }
        }

        const [donations, total] = await Promise.all([
            this.prisma.donation.findMany({
                where,
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
                orderBy: {
                    donatedAt: 'desc',
                },
                skip,
                take: limit,
            }),
            this.prisma.donation.count({
                where,
            }),
        ]);

        return {
            data: DonationMapper.toResponseList(donations),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
}