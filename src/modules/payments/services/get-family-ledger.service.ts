import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { PaymentStatus } from '@/common/enums/payment-status.enum';

import { PAYMENT_MESSAGES } from '../constants/payment.constants';
import { FamilyLedgerQueryDto } from '../dto/requests/family-ledger-query.dto';
import { FamilyLedgerResponseDto } from '../dto/responses/family-ledger-response.dto';

@Injectable()
export class GetFamilyLedgerService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    familyId: string,
    query: FamilyLedgerQueryDto,
  ): Promise<FamilyLedgerResponseDto> {
    const { year, month } = query;

    const family = await this.prisma.family.findUnique({
      where: {
        id: familyId,
      },
      include: {
        charges: {
          where: {
            ...(year && { year }),
            ...(month && { month }),
          },
          orderBy: [
            {
              year: 'desc',
            },
            {
              month: 'desc',
            },
          ],
          include: {
            payments: {
              orderBy: {
                paidAt: 'asc',
              },
            },
          },
        },
      },
    });

    if (!family) {
      throw new NotFoundException(PAYMENT_MESSAGES.FAMILY_NOT_FOUND);
    }

    const ledger = family.charges.map((charge) => {
      const paidAmount = charge.payments.reduce(
        (total, payment) => total + Number(payment.amount),
        0,
      );

      const dueAmount = Math.max(Number(charge.amount) - paidAmount, 0);

      const status =
        paidAmount === 0
          ? PaymentStatus.DUE
          : paidAmount >= Number(charge.amount)
            ? PaymentStatus.PAID
            : PaymentStatus.PARTIAL;

      return {
        monthlyChargeId: charge.id,

        year: charge.year,
        month: charge.month,

        chargeAmount: Number(charge.amount),
        paidAmount,
        dueAmount,

        status,

        payments: charge.payments.map((payment) => ({
          id: payment.id,

          amount: Number(payment.amount),

          method: payment.method,
          reference: payment.reference,
          note: payment.note,

          paidAt: payment.paidAt,
        })),
      };
    });

    const totalCharge = ledger.reduce(
      (sum, item) => sum + item.chargeAmount,
      0,
    );

    const totalPaid = ledger.reduce((sum, item) => sum + item.paidAmount, 0);

    return {
      familyId: family.id,

      familyNo: family.familyNo,
      headName: family.headName,
      phone: family.phone,
      address: family.address,

      summary: {
        totalCharge,
        totalPaid,
        totalDue: totalCharge - totalPaid,
      },

      ledger,
    };
  }
}
