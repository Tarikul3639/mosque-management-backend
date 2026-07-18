import { Injectable } from '@nestjs/common';

import { Prisma } from '@/lib/prisma/client';
import { PrismaService } from '@/common/prisma/prisma.service';

import { DonorMapper } from '../mappers/donor.mapper';

import { DonorQueryDto } from '../dto/requests/donor-query.dto';
import { DonorListResponseDto } from '../dto/responses/donor-list-response.dto';

@Injectable()
export class ListDonorsService {
    constructor(private readonly prismaService: PrismaService) { }

    async execute(query: DonorQueryDto): Promise<DonorListResponseDto> {
        const { page = 1, limit = 10, search, isActive } = query;

        const skip = (page - 1) * limit;
        const where: Prisma.DonorWhereInput = {};

        if (search) {
            where.OR = [
                {
                    fullName: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    email: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    phone: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
            ];
        }

        if (isActive !== undefined) {
            where.isActive = isActive === 'true';
        }

        const [donors, total] = await Promise.all([
            this.prismaService.donor.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            }),

            this.prismaService.donor.count({
                where,
            }),
        ]);

        return {
            data: DonorMapper.toResponseList(donors),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
}
