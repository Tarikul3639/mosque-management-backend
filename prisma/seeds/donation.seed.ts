import type { PrismaClient } from '@/lib/prisma/client';

import { faker } from '@faker-js/faker';

export async function seedDonations(
    prisma: PrismaClient,
): Promise<void> {
    console.log('🎁 Seeding donations...');

    for (let i = 0; i < 100; i++) {
        await prisma.donation.create({
            data: {
                donorName: faker.person.fullName(),
                phone: faker.phone.number(),
                address: faker.location.streetAddress(),
                amount: faker.number.float({
                    min: 100,
                    max: 10000,
                    fractionDigits: 2,
                }),
                purpose: faker.lorem.words(4),
                isAnonymous: faker.datatype.boolean(),
                receiptNo: faker.string.uuid(),
                note: faker.lorem.sentence(),
                donatedAt: faker.date.recent(),
            },
        });
    }

    console.log('✅ Donations seeded.');
}