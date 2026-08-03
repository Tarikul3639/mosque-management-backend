import type { PrismaClient } from '@/lib/prisma/client';

import { faker } from '@faker-js/faker';

import {
  PaymentMethod,
} from '@/lib/prisma/client';

export async function seedPayments(
  prisma: PrismaClient,
): Promise<void> {
  console.log('💵 Seeding payments...');

  const charges = await prisma.monthlyCharge.findMany();

  for (const charge of charges) {
    const existingPayment = await prisma.payment.findFirst({
      where: {
        monthlyChargeId: charge.id,
      },
    });

    if (existingPayment) {
      continue;
    }

    const paidAmount = faker.datatype.boolean({
      probability: 0.8,
    })
      ? Number(charge.amount)
      : faker.number.float({
        min: 0,
        max: Number(charge.amount),
        fractionDigits: 2,
      });

    const payment =
      paidAmount > 0
        ? await prisma.payment.create({
          data: {
            familyId: charge.familyId,
            monthlyChargeId: charge.id,
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
        })
        : null;

    await prisma.monthlyCharge.update({
      where: {
        id: charge.id,
      },
      data: {
        paidAmount,
        paidAt: payment?.paidAt,
      },
    });
  }

  console.log('✅ Payments seeded.');
}