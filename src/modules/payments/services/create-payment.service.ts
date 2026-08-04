import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { PaymentStatus } from '@/common/enums/payment-status.enum';

import { PAYMENT_MESSAGES } from '../constants/payment.constants';
import { CreatePaymentDto } from '../dto/requests/create-payment.dto';
import { PaymentResponseDto } from '../dto/responses/payment-response.dto';
import { getPaymentStatus } from '@/common/utils/get-payment-status.util';

@Injectable()
export class CreatePaymentService {
  constructor(private readonly prisma: PrismaService) { }

  async execute(dto: CreatePaymentDto, userId: string): Promise<PaymentResponseDto> {
    const {
      familyId,
      monthlyChargeId,
      amount,
      method,
      reference,
      note,
      paidAt,
    } = dto;

    const family = await this.prisma.family.findUnique({
      where: {
        id: familyId,
      },
    });

    if (!family) {
      throw new NotFoundException(PAYMENT_MESSAGES.FAMILY_NOT_FOUND);
    }

    const monthlyCharge = await this.prisma.monthlyCharge.findUnique({
      where: {
        id: monthlyChargeId,
      },
    });

    if (!monthlyCharge) {
      throw new NotFoundException(PAYMENT_MESSAGES.MONTHLY_CHARGE_NOT_FOUND);
    }

    if (monthlyCharge.familyId !== familyId) {
      throw new BadRequestException(
        PAYMENT_MESSAGES.MONTHLY_CHARGE_DOES_NOT_BELONG_TO_FAMILY,
      );
    }

    const status = getPaymentStatus(
      Number(monthlyCharge.amount),
      Number(monthlyCharge.paidAmount),
    );

    if (status === PaymentStatus.PAID) {
      throw new BadRequestException(PAYMENT_MESSAGES.ALREADY_PAID);
    }

    const dueAmount =
      Number(monthlyCharge.amount) - Number(monthlyCharge.paidAmount);

    if (amount > dueAmount) {
      throw new BadRequestException(PAYMENT_MESSAGES.PAYMENT_EXCEEDS_DUE);
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          familyId,
          monthlyChargeId,
          amount,
          method,
          reference,
          note,
          createdById: userId,
          updatedById: userId,
          paidAt: paidAt ? new Date(paidAt) : new Date(),
        },
        include: {
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

      const payments = await tx.payment.findMany({
        where: {
          monthlyChargeId,
        },
        orderBy: {
          paidAt: 'asc',
        },
      });

      const paidAmount = payments.reduce(
        (total, payment) => total + Number(payment.amount),
        0,
      );

      const updatedCharge = await tx.monthlyCharge.update({
        where: {
          id: monthlyChargeId,
        },
        data: {
          paidAmount,
          updatedById: userId,
          paidAt: payments[payments.length - 1]?.paidAt ?? null,
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
        payment,
        updatedCharge,
      };
    });

    return {
      id: result.payment.id,
      familyId: result.payment.familyId,
      familyNo: result.updatedCharge.family.familyNo,
      headName: result.updatedCharge.family.headName,
      monthlyChargeId: result.payment.monthlyChargeId,
      year: result.updatedCharge.year,
      month: result.updatedCharge.month,
      chargeAmount: Number(result.updatedCharge.amount),
      paymentAmount: Number(result.payment.amount),
      paidAmount: Number(result.updatedCharge.paidAmount),
      status: getPaymentStatus(
        Number(result.updatedCharge.amount),
        Number(result.updatedCharge.paidAmount),
      ),
      method: result.payment.method,
      reference: result.payment.reference,
      note: result.payment.note,
      paidAt: result.payment.paidAt,
      createdBy: {
        id: result.payment.createdBy?.id ?? '',
        name: result.payment.createdBy?.name ?? '',
      },
      updatedBy: {
        id: result.payment.updatedBy?.id ?? '',
        name: result.payment.updatedBy?.name ?? '',
      },
      createdAt: result.payment.createdAt,
      updatedAt: result.payment.updatedAt,
    };
  }
}