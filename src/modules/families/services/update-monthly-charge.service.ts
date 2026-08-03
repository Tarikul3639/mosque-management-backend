import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { MONTHLY_CHARGE_MESSAGES } from '../constants/family.constants';
import { UpdateMonthlyChargeDto } from '../dto/requests/update-monthly-charge.dto';
import { MonthlyChargeResponseDto } from '../dto/responses/monthly-charge-response.dto';
import { getPaymentStatus } from '@/common/utils/get-payment-status.util';

@Injectable()
export class UpdateMonthlyChargeService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(
        id: string,
        dto: UpdateMonthlyChargeDto,
    ): Promise<MonthlyChargeResponseDto> {
        const charge = await this.prisma.monthlyCharge.findUnique({
            where: {
                id,
            },
        });

        if (!charge) {
            throw new NotFoundException(MONTHLY_CHARGE_MESSAGES.NOT_FOUND);
        }

        const updatedCharge = await this.prisma.monthlyCharge.update({
            where: {
                id,
            },
            data: {
                ...(dto.amount !== undefined && {
                    amount: dto.amount,
                }),
                ...(dto.paidAmount !== undefined && {
                    paidAmount: dto.paidAmount,
                }),
                ...(dto.dueDate !== undefined && {
                    dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
                }),
                ...(dto.paidAt !== undefined && {
                    paidAt: dto.paidAt ? new Date(dto.paidAt) : null,
                }),
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

        return {
            id: updatedCharge.id,
            familyId: updatedCharge.familyId,
            familyNo: updatedCharge.family.familyNo,
            headName: updatedCharge.family.headName,
            year: updatedCharge.year,
            month: updatedCharge.month,
            amount: Number(updatedCharge.amount),
            paidAmount: Number(updatedCharge.paidAmount),
            status: getPaymentStatus(
                Number(updatedCharge.amount),
                Number(updatedCharge.paidAmount),
            ),
            dueDate: updatedCharge.dueDate,
            paidAt: updatedCharge.paidAt,
            createdAt: updatedCharge.createdAt,
            updatedAt: updatedCharge.updatedAt,
        };
    }
}
