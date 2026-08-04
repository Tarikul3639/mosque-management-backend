import type { PrismaClient } from '@/lib/prisma/client';

import { faker } from '@faker-js/faker';

import { ProjectStatus } from '@/lib/prisma/client';

export async function seedProjects(
  prisma: PrismaClient,
): Promise<void> {
  console.log('🏗️ Seeding projects...');

  const statuses = Object.values(ProjectStatus);

  for (let i = 0; i < 10; i++) {
    const budget = faker.number.float({
      min: 50_000,
      max: 1_000_000,
      fractionDigits: 2,
    });

    const spent = faker.number.float({
      min: 1_000,
      max: budget,
      fractionDigits: 2,
    });

    await prisma.$transaction(async (tx) => {
      const file = await tx.file.create({
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

      const project = await tx.project.create({
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
        },
      });

      await tx.project.update({
        where: {
          id: project.id,
        },
        data: {
          images: {
            connect: {
              id: file.id,
            },
          },
        },
      })
    });
  }

  console.log('✅ Projects seeded.');
}