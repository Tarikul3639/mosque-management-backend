import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { PAYMENT_MESSAGES } from '../constants/payment.constants';
import { PaymentResponseDto } from '../dto/responses/payment-response.dto';
import { getPaymentStatus } from '@/common/utils/get-payment-status.util';

@Injectable()
export class GetPaymentService {
  constructor(private readonly prisma: PrismaService) { }

  async execute(id: string): Promise<PaymentResponseDto> {
    const payment = await this.prisma.payment.findUnique({
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
        monthlyCharge: {
          select: {
            year: true,
            month: true,
            amount: true,
            paidAmount: true,
          },
        },
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

    if (!payment) {
      throw new NotFoundException(PAYMENT_MESSAGES.NOT_FOUND);
    }

    return {
      id: payment.id,

      familyId: payment.familyId,
      familyNo: payment.family.familyNo,
      headName: payment.family.headName,

      monthlyChargeId: payment.monthlyChargeId,

      year: payment.monthlyCharge.year,
      month: payment.monthlyCharge.month,

      chargeAmount: Number(payment.monthlyCharge.amount),

      paymentAmount: Number(payment.amount),

      paidAmount: Number(payment.monthlyCharge.paidAmount),

      status: getPaymentStatus(
        Number(payment.monthlyCharge.amount),
        Number(payment.monthlyCharge.paidAmount),
      ),

      method: payment.method,
      reference: payment.reference,
      note: payment.note,

      paidAt: payment.paidAt,

      createdBy: {
        id: payment.createdBy?.id ?? '',
        name: payment.createdBy?.name ?? '',
      },
      updatedBy: {
        id: payment.updatedBy?.id ?? '',
        name: payment.updatedBy?.name ?? '',
      },

      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }
}