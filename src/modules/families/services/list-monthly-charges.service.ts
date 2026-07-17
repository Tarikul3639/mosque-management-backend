import { Injectable } from '@nestjs/common';

import { Prisma } from '@/lib/prisma/client';
import { PrismaService } from '@/common/prisma/prisma.service';

import { MonthlyChargeQueryDto } from '../dto/requests/monthly-charge-query.dto';
import { MonthlyChargeListResponseDto } from '../dto/responses/monthly-charge-list-response.dto';

@Injectable()
export class ListMonthlyChargesService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(
        query: MonthlyChargeQueryDto,
    ): Promise<MonthlyChargeListResponseDto> {
        const {
            page = 1,
            limit = 10,
            search,
            year,
            month,
            status,
            activeOnly = true,
        } = query;

        const skip = (page - 1) * limit;

        const where: Prisma.MonthlyChargeWhereInput = {
            ...(year !== undefined && {
                year,
            }),

            ...(month !== undefined && {
                month,
            }),

            ...(status && {
                status,
            }),

            family: {
                ...(activeOnly && {
                    isActive: true,
                }),

                ...(search && {
                    OR: [
                        {
                            familyNo: {
                                contains: search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            headName: {
                                contains: search,
                                mode: 'insensitive',
                            },
                        },
                    ],
                }),
            },
        };

        const [charges, total] = await Promise.all([
            this.prisma.monthlyCharge.findMany({
                where,
                skip,
                take: limit,
                orderBy: [
                    {
                        year: 'desc',
                    },
                    {
                        month: 'desc',
                    },
                    {
                        family: {
                            familyNo: 'asc',
                        },
                    },
                ],
                include: {
                    family: {
                        select: {
                            familyNo: true,
                            headName: true,
                        },
                    },
                },
            }),

            this.prisma.monthlyCharge.count({
                where,
            }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: charges.map((charge) => ({
                id: charge.id,

                familyId: charge.familyId,
                familyNo: charge.family.familyNo,
                headName: charge.family.headName,

                year: charge.year,
                month: charge.month,

                amount: Number(charge.amount),
                paidAmount: Number(charge.paidAmount),

                status: charge.status,

                paymentId: charge.paymentId,

                dueDate: charge.dueDate,
                paidAt: charge.paidAt,

                createdAt: charge.createdAt,
                updatedAt: charge.updatedAt,
            })),

            total,
            page,
            limit,
            totalPages,

            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        };
    }
}
