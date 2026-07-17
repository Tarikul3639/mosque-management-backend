import type { PrismaClient } from '@/lib/prisma/client';

import { faker } from '@faker-js/faker';

import {
    PaymentMethod,
    PaymentStatus,
} from '@/lib/prisma/client';

export async function seedPayments(
    prisma: PrismaClient,
): Promise<void> {
    console.log('💵 Seeding payments...');

    const charges = await prisma.monthlyCharge.findMany({
        where: {
            paymentId: null,
        },
    });

    for (const charge of charges) {
        const paidAmount = faker.datatype.boolean({
            probability: 0.8,
        })
            ? Number(charge.amount)
            : faker.number.float({
                min: 0,
                max: Number(charge.amount),
                fractionDigits: 2,
            });

        const payment = await prisma.payment.create({
            data: {
                familyId: charge.familyId,
                amount: paidAmount,
                method: faker.helpers.arrayElement([
                    PaymentMethod.CASH,
                    PaymentMethod.BKASH,
                    PaymentMethod.NAGAD,
                    PaymentMethod.BANK_TRANSFER,
                    PaymentMethod.CARD,
                    PaymentMethod.QR,
                ]),
                reference: faker.helpers.maybe(
                    () => faker.string.alphanumeric(12),
                    {
                        probability: 0.6,
                    },
                ),
                note: faker.helpers.maybe(
                    () => faker.lorem.sentence(),
                    {
                        probability: 0.3,
                    },
                ),
            },
        });

        await prisma.monthlyCharge.update({
            where: {
                id: charge.id,
            },
            data: {
                paymentId: payment.id,
                paidAmount,
                status:
                    paidAmount >= Number(charge.amount)
                        ? PaymentStatus.PAID
                        : paidAmount === 0
                            ? PaymentStatus.DUE
                            : PaymentStatus.PARTIAL,
                paidAt:
                    paidAmount > 0
                        ? payment.paidAt
                        : undefined,
            },
        });
    }

    console.log('✅ Payments seeded.');
}