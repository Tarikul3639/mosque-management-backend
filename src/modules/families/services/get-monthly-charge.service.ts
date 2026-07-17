import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { PaymentStatus } from '@/lib/prisma/client';
import { MONTHLY_CHARGE_MESSAGES } from '../constants/family.constants';
import { MonthlyChargeResponseDto } from '../dto/responses/monthly-charge-response.dto';

@Injectable()
export class GetMonthlyChargeService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(id: string): Promise<MonthlyChargeResponseDto> {
        const charge = await this.prisma.monthlyCharge.findUnique({
            where: {
                id,
            },
            include: {
                family: {
                    select: {
                        familyNo: true,
                        headName: true,
                    },
                },
            },
        });

        if (!charge) {
            throw new NotFoundException(MONTHLY_CHARGE_MESSAGES.NOT_FOUND);
        }

        return {
            id: charge.id,

            familyId: charge.familyId,
            familyNo: charge.family.familyNo,
            headName: charge.family.headName,

            year: charge.year,
            month: charge.month,

            amount: Number(charge.amount),
            paidAmount: Number(charge.paidAmount),

            status: charge.status as PaymentStatus,

            paymentId: charge.paymentId,

            dueDate: charge.dueDate,
            paidAt: charge.paidAt,

            createdAt: charge.createdAt,
            updatedAt: charge.updatedAt,
        };
    }
}
