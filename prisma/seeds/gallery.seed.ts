import type { PrismaClient } from '@/lib/prisma/client';

import { faker } from '@faker-js/faker';

export async function seedGallery(
    prisma: PrismaClient,
): Promise<void> {
    console.log('🖼️ Seeding gallery...');

    for (let index = 1; index <= 20; index++) {
        await prisma.gallery.create({
            data: {
                title: faker.lorem.words(3),
                description: faker.lorem.sentence(),
                imageUrl: faker.image.urlPicsumPhotos({
                    width: 1200,
                    height: 800,
                }),
                order: index,
            },
        });
    }

    console.log('✅ Gallery seeded.');
}