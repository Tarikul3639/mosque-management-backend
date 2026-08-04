import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { FAMILY_MESSAGES } from '../constants/family.constants';
import { FamilyDetailsResponseDto } from '../dto/responses/family-details.dto';

@Injectable()
export class GetFamilyDetailsService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<FamilyDetailsResponseDto> {
    const family = await this.prisma.family.findUnique({
      where: {
        id,
      },
      include: {
        avatar: {
          select: {
            id: true,
            url: true,
          },
        },
        feeHistory: {
          where: {
            OR: [
              {
                endDate: null,
              },
              {
                endDate: {
                  gte: new Date(),
                },
              },
            ],
          },
          orderBy: {
            startDate: 'desc',
          },
          take: 1,
        },
        payments: {
          select: {
            amount: true,
            paidAt: true,
          },
          orderBy: {
            paidAt: 'desc',
          },
        },
        charges: {
          select: {
            amount: true,
            paidAmount: true,
          },
        },
      },
    });

    if (!family) {
      throw new NotFoundException(FAMILY_MESSAGES.NOT_FOUND);
    }

    const currentFee = family.feeHistory[0] ?? null;

    const totalPaid = family.payments.reduce(
      (sum, payment) => sum + Number(payment.amount),
      0,
    );

    const totalDue = family.charges.reduce(
      (sum, charge) =>
        sum + (Number(charge.amount) - Number(charge.paidAmount)),
      0,
    );

    const lastPayment = family.payments.length > 0 ? family.payments[0] : null;

    return {
      id: family.id,
      familyNo: family.familyNo,
      headName: family.headName,
      phone: family.phone,
      email: family.email,
      address: family.address,
      avatar: family.avatar,
      isActive: family.isActive,

      currentFee: currentFee
        ? {
            id: currentFee.id,
            monthlyFee: Number(currentFee.monthlyFee),
            startDate: currentFee.startDate,
            endDate: currentFee.endDate,
          }
        : null,

      paymentSummary: {
        totalPaid,
        totalDue,
        lastPaymentAt: lastPayment?.paidAt ?? null,
      },

      createdAt: family.createdAt,
      updatedAt: family.updatedAt,
    };
  }
}
