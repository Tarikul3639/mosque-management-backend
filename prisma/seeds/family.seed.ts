import type { PrismaClient } from '@/lib/prisma/client';

import { faker } from '@faker-js/faker';

export async function seedFamilies(
    prisma: PrismaClient,
): Promise<void> {
    console.log('🏠 Seeding families...');

    for (let index = 1; index <= 100; index++) {
        await prisma.family.upsert({
            where: {
                familyCode: `F-${index.toString().padStart(4, '0')}`,
            },
            update: {},
            create: {
                familyCode: `F-${index.toString().padStart(4, '0')}`,
                headName: faker.person.fullName(),
                phone: faker.phone.number(),
                address: faker.location.streetAddress(),
                monthlyFee: faker.number.float({
                    min: 100,
                    max: 1000,
                    fractionDigits: 2,
                }),
                memberCount: faker.number.int({
                    min: 1,
                    max: 8,
                }),
                joiningDate: faker.date.past(),
            },
        });
    }

    console.log('✅ Families seeded.');
}