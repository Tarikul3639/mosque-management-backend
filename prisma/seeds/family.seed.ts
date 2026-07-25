import type { PrismaClient } from '@/lib/prisma/client';

import { faker } from '@faker-js/faker';

export async function seedFamilies(
    prisma: PrismaClient,
): Promise<void> {
    console.log('🏠 Seeding families...');

    for (let index = 1; index <= 10; index++) {
        const familyNo = `F-${index.toString().padStart(4, '0')}`;

        let avatarId: string | undefined;

        if (faker.datatype.boolean({ probability: 0.5 })) {
            const file = await prisma.file.create({
                data: {
                    url: faker.image.avatar(),
                    publicId: faker.string.uuid(),
                    originalName: faker.system.fileName(),
                    mimeType: 'image/jpeg',
                    extension: 'jpg',
                    size: faker.number.int({
                        min: 10_000,
                        max: 500_000,
                    }),
                    width: 512,
                    height: 512,
                },
            });

            avatarId = file.id;
        }

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
                    {
                        probability: 0.9,
                    },
                ),
                address: faker.helpers.maybe(
                    () => faker.location.streetAddress(),
                    {
                        probability: 0.95,
                    },
                ),
                avatarId,
                isActive: faker.datatype.boolean({
                    probability: 0.9,
                }),
            },
        });
    }

    console.log('✅ Families seeded.');
}