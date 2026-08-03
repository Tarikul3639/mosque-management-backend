import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { PAYMENT_MESSAGES } from '../constants/payment.constants';
import { UpdatePaymentDto } from '../dto/requests/update-payment.dto';
import { PaymentResponseDto } from '../dto/responses/payment-response.dto';
import { getPaymentStatus } from '@/common/utils/get-payment-status.util';

@Injectable()
export class UpdatePaymentService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(
        id: string,
        dto: UpdatePaymentDto,
    ): Promise<PaymentResponseDto> {
        const payment = await this.prisma.payment.findUnique({
            where: {
                id,
            },
        });

        if (!payment) {
            throw new NotFoundException(PAYMENT_MESSAGES.NOT_FOUND);
        }

        const result = await this.prisma.$transaction(async (tx) => {
            const updatedPayment = await tx.payment.update({
                where: {
                    id,
                },
                data: {
                    ...(dto.amount !== undefined && {
                        amount: dto.amount,
                    }),
                    ...(dto.method !== undefined && {
                        method: dto.method,
                    }),
                    ...(dto.reference !== undefined && {
                        reference: dto.reference,
                    }),
                    ...(dto.note !== undefined && {
                        note: dto.note,
                    }),
                    ...(dto.paidAt !== undefined && {
                        paidAt: dto.paidAt ? new Date(dto.paidAt) : payment.paidAt,
                    }),
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
                (sum, item) => sum + Number(item.amount),
                0,
            );

            const updatedCharge = await tx.monthlyCharge.update({
                where: {
                    id: payment.monthlyChargeId,
                },
                data: {
                    paidAmount,
                    paidAt:
                        payments.length > 0 ? payments[payments.length - 1].paidAt : null,
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
                payment: updatedPayment,
                charge: updatedCharge,
            };
        });

        return {
            id: result.payment.id,
            familyId: result.payment.familyId,
            familyNo: result.charge.family.familyNo,
            headName: result.charge.family.headName,
            monthlyChargeId: result.payment.monthlyChargeId,
            year: result.charge.year,
            month: result.charge.month,
            chargeAmount: Number(result.charge.amount),
            paymentAmount: Number(result.payment.amount),
            paidAmount: Number(result.charge.paidAmount),
            status: getPaymentStatus(
                Number(result.charge.amount),
                Number(result.charge.paidAmount),
            ),
            method: result.payment.method,
            reference: result.payment.reference,
            note: result.payment.note,
            paidAt: result.payment.paidAt,
            createdAt: result.payment.createdAt,
            updatedAt: result.payment.updatedAt,
        };
    }
}
