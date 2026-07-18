import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { PaymentStatus } from '@/lib/prisma/client';

import { PAYMENT_MESSAGES } from '../constants/payment.constants';

@Injectable()
export class DeletePaymentService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(id: string): Promise<void> {
        const payment = await this.prisma.payment.findUnique({
            where: {
                id,
            },
        });

        if (!payment) {
            throw new NotFoundException(PAYMENT_MESSAGES.NOT_FOUND);
        }

        await this.prisma.$transaction(async (tx) => {
            await tx.payment.delete({
                where: {
                    id,
                },
            });

            const payments = await tx.payment.findMany({
                where: {
                    monthlyChargeId: payment.monthlyChargeId,
                },
                orderBy: {
                    paidAt: 'asc',
                },
            });

            const charge = await tx.monthlyCharge.findUniqueOrThrow({
                where: {
                    id: payment.monthlyChargeId,
                },
            });

            const paidAmount = payments.reduce(
                (total, payment) => total + Number(payment.amount),
                0,
            );

            const isPaid = paidAmount >= Number(charge.amount);
            const isPartial = paidAmount > 0 && !isPaid;

            const status = isPaid
                ? PaymentStatus.PAID
                : isPartial
                    ? PaymentStatus.PARTIAL
                    : PaymentStatus.DUE;

            const lastPayment =
                payments.length > 0
                    ? payments[payments.length - 1]
                    : null;

            await tx.monthlyCharge.update({
                where: {
                    id: payment.monthlyChargeId,
                },
                data: {
                    paidAmount,
                    status,
                    paidAt: lastPayment?.paidAt ?? null,
                },
            });
        });
    }
}
