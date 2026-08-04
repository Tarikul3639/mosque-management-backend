import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { getPaymentStatus } from '@/common/utils/get-payment-status.util';

import { MONTHLY_CHARGE_MESSAGES } from '../constants/family.constants';
import { MonthlyChargeResponseDto } from '../dto/responses/monthly-charge-response.dto';

@Injectable()
export class GetMonthlyChargeService {
  constructor(private readonly prisma: PrismaService) {}

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

    const amount = Number(charge.amount);
    const paidAmount = Number(charge.paidAmount);

    return {
      id: charge.id,

      familyId: charge.familyId,
      familyNo: charge.family.familyNo,
      headName: charge.family.headName,

      year: charge.year,
      month: charge.month,

      amount,
      paidAmount,

      status: getPaymentStatus(amount, paidAmount),

      dueDate: charge.dueDate,
      paidAt: charge.paidAt,

      createdAt: charge.createdAt,
      updatedAt: charge.updatedAt,
    };
  }
}
