import type { PrismaClient } from '@/lib/prisma/client';

import { faker } from '@faker-js/faker';

export async function seedFamilies(
    prisma: PrismaClient,
): Promise<void> {
    console.log('🏠 Seeding families...');

    for (let index = 1; index <= 50; index++) {
        const familyNo = `F-${index.toString().padStart(4, '0')}`;

        await prisma.family.upsert({
            where: {
                familyNo,
            },
            update: {},
            create: {
                familyNo,
                headName: faker.person.fullName(),
                phone: faker.helpers.maybe(
                    () => faker.phone.number(),
                    { probability: 0.9 },
                ),
                address: faker.helpers.maybe(
                    () => faker.location.streetAddress(),
                    { probability: 0.95 },
                ),
                avatar: faker.helpers.maybe(
                    () => faker.image.avatar(),
                    { probability: 0.5 },
                ),
                isActive: faker.datatype.boolean({
                    probability: 0.9,
                }),
            },
        });
    }

    console.log('✅ Families seeded.');
}