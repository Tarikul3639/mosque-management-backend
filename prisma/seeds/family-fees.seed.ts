import type { PrismaClient } from '../../src/lib/prisma/client';

import { faker } from '@faker-js/faker';

export async function seedFamilyFees(
  prisma: PrismaClient,
): Promise<void> {
  console.log('💰 Seeding family fees...');

  const families = await prisma.family.findMany({
    select: {
      id: true,
    },
  });

  for (const family of families) {
    const existingFee = await prisma.familyFee.findFirst({
      where: {
        familyId: family.id,
        endDate: null,
      },
    });

    if (existingFee) {
      continue;
    }

    await prisma.familyFee.create({
      data: {
        familyId: family.id,
        monthlyFee: faker.number.float({
          min: 100,
          max: 1000,
          fractionDigits: 2,
        }),
        startDate: faker.date.past(),
        endDate: null,
      },
    });
  }

  console.log('✅ Family fees seeded.');
}