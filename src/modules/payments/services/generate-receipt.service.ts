// src/modules/payments/services/generate-receipt.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../common/prisma/prisma.service';
import { ReceiptNoGenerator } from '../../../common/utils/receipt';
import { getPaymentStatus } from '../../../common/utils/get-payment-status.util';

import { PAYMENT_MESSAGES } from '../constants/payment.constants';
import { ReceiptResponseDto } from '../dto/responses/receipt-response.dto';
import { generatePaymentReceiptPdf } from '../utils/generate-payment-receipt-pdf';

@Injectable()
export class GenerateReceiptService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(paymentId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: {
        id: paymentId,
      },
      include: {
        family: {
          select: {
            familyNo: true,
            headName: true,
            phone: true,
            address: true,
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
      },
    });

    if (!payment) {
      throw new NotFoundException(PAYMENT_MESSAGES.NOT_FOUND);
    }

    const receiptResponseDto: ReceiptResponseDto = {
      receiptNo: ReceiptNoGenerator.generate(payment.id, payment.paidAt),

      paymentId: payment.id,

      familyId: payment.familyId,
      familyNo: payment.family.familyNo,
      headName: payment.family.headName,
      phone: payment.family.phone,
      address: payment.family.address,

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
      createdAt: payment.createdAt,
      generatedAt: new Date(),
    };

    const buffer = await generatePaymentReceiptPdf(receiptResponseDto);

    return {
      fileName: `Receipt-${receiptResponseDto.receiptNo}.pdf`,
      buffer,
    };
  }
}
