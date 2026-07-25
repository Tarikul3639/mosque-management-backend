import type { PrismaClient } from '@/lib/prisma/client';

import {
    PaymentMethod,
    Prisma,
} from '@/lib/prisma/client';

import { faker } from '@faker-js/faker';

export async function seedDonations(
    prisma: PrismaClient,
): Promise<void> {
    console.log('🎁 Seeding donations...');

    for (let i = 0; i < 50; i++) {
        const donor = await prisma.donor.create({
            data: {
                name: faker.person.fullName(),
                phone: faker.phone.number(),
                address: faker.location.streetAddress(),
                email: faker.internet.email(),
            },
        });

        await prisma.donation.create({
            data: {
                donorId: donor.id,

                amount: new Prisma.Decimal(
                    faker.number.float({
                        min: 100,
                        max: 10000,
                        fractionDigits: 2,
                    }),
                ),

                purpose: faker.lorem.words(4),

                isAnonymous: faker.datatype.boolean(),

                receiptNo: `DON-${faker.string.numeric(8)}`,

                paymentMethod: faker.helpers.arrayElement(
                    Object.values(PaymentMethod),
                ),

                transactionReference:
                    faker.datatype.boolean()
                        ? faker.string.alphanumeric(12)
                        : null,

                note: faker.lorem.sentence(),

                donatedAt: faker.date.recent(),
            },
        });
    }

    console.log('✅ Donations seeded.');
}