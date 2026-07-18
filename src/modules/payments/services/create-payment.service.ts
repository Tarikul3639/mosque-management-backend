import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { PaymentStatus } from '@/lib/prisma/client';

import { PAYMENT_MESSAGES } from '../constants/payment.constants';
import { CreatePaymentDto } from '../dto/requests/create-payment.dto';
import { PaymentResponseDto } from '../dto/responses/payment-response.dto';

@Injectable()
export class CreatePaymentService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(dto: CreatePaymentDto): Promise<PaymentResponseDto> {
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

        if (monthlyCharge.status === PaymentStatus.PAID) {
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
                    paidAt: paidAt ? new Date(paidAt) : new Date(),
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

            const status =
                paidAmount === 0
                    ? PaymentStatus.DUE
                    : paidAmount >= Number(monthlyCharge.amount)
                        ? PaymentStatus.PAID
                        : PaymentStatus.PARTIAL;

            const updatedCharge = await tx.monthlyCharge.update({
                where: {
                    id: monthlyChargeId,
                },
                data: {
                    paidAmount,
                    status,
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
            status: result.updatedCharge.status,
            method: result.payment.method,
            reference: result.payment.reference,
            note: result.payment.note,
            paidAt: result.payment.paidAt,
            createdAt: result.payment.createdAt,
            updatedAt: result.payment.updatedAt,
        };
    }
}
