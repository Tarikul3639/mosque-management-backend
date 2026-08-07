import type { PrismaClient } from '../../src/lib/prisma/client';

import { faker } from '@faker-js/faker';

export async function seedGallery(
    prisma: PrismaClient,
): Promise<void> {
    console.log('🖼️ Seeding gallery...');

    for (let index = 1; index <= 10; index++) {
        const imageCount = faker.number.int({
            min: 3,
            max: 8,
        });

        const files: { id: string }[] = [];

        for (let imageIndex = 1; imageIndex <= imageCount; imageIndex++) {
            const file = await prisma.file.create({
                data: {
                    url: faker.image.urlPicsumPhotos({
                        width: 1200,
                        height: 800,
                    }),
                    publicId: faker.string.uuid(),
                    originalName: `gallery-${index}-${imageIndex}.jpg`,
                    mimeType: 'image/jpeg',
                    extension: 'jpg',
                    size: faker.number.int({
                        min: 100_000,
                        max: 5_000_000,
                    }),
                    width: 1200,
                    height: 800,
                },
            });

            files.push({
                id: file.id,
            });
        }

        await prisma.gallery.create({
            data: {
                title: faker.lorem.words(3),
                description: faker.lorem.sentence(),
                order: index,
                images: {
                    connect: files,
                },
            },
        });
    }

    console.log('✅ Gallery seeded.');
}