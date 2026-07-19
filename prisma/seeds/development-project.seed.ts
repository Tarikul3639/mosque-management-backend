import type { PrismaClient } from '@/lib/prisma/client';

import { ProjectStatus } from '@/lib/prisma/client';
import { faker } from '@faker-js/faker';

export async function seedDevelopmentProjects(
  prisma: PrismaClient,
): Promise<void> {
  console.log('🏗️ Seeding development projects...');

  const statuses = Object.values(ProjectStatus);

  for (let i = 0; i < 20; i++) {
    const budget = faker.number.float({
      min: 50000,
      max: 1000000,
      fractionDigits: 2,
    });

    const spent = faker.number.float({
      min: 1000,
      max: budget,
      fractionDigits: 2,
    });

    const file = await prisma.file.create({
      data: {
        url: faker.image.urlPicsumPhotos(),
        publicId: faker.string.uuid(),
        originalName: `project-${i + 1}.jpg`,
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

    await prisma.developmentProject.create({
      data: {
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(),
        budget,
        spent,
        progress: faker.number.int({
          min: 0,
          max: 100,
        }),
        status: faker.helpers.arrayElement(statuses),
        startDate: faker.date.past(),
        endDate: faker.date.future(),

        images: {
          connect: {
            id: file.id,
          },
        },
      },
    });
  }

  console.log('✅ Development projects seeded.');
}