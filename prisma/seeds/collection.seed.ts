import type { PrismaClient } from '@/lib/prisma/client';

import { CollectionStatus, Month } from '@/lib/prisma/client';

import { faker } from '@faker-js/faker';

export async function seedCollections(
    prisma: PrismaClient,
): Promise<void> {
    console.log('💰 Seeding collections...');

    const families = await prisma.family.findMany({
        select: {
            id: true,
            monthlyFee: true,
        },
    });

    const users = await prisma.user.findMany({
        select: {
            id: true,
        },
    });

    const months = Object.values(Month);

    for (const family of families) {
        const month = faker.helpers.arrayElement(months);
        const collector = faker.helpers.arrayElement(users);

        const amount = Number(family.monthlyFee);

        await prisma.collection.create({
            data: {
                familyId: family.id,
                collectedById: collector.id,
                year: new Date().getFullYear(),
                month,
                amount,
                due: faker.number.float({
                    min: 0,
                    max: amount,
                    fractionDigits: 2,
                }),
                status: faker.helpers.arrayElement(
                    Object.values(CollectionStatus),
                ),
                receiptNo: faker.string.uuid(),
                paidAt: faker.date.recent(),
            },
        });
    }

    console.log('✅ Collections seeded.');
}