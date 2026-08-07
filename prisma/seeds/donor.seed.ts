import type { PrismaClient } from '../../src/lib/prisma/client';

import { faker } from '@faker-js/faker';

export async function seedDonors(
  prisma: PrismaClient,
): Promise<void> {
  console.log('🤝 Seeding donors...');

  for (let index = 1; index <= 30; index++) {
    const name = faker.person.fullName();
    const phone = `017${faker.string.numeric(8)}`;

    const existing = await prisma.donor.findFirst({
      where: {
        name,
        phone,
      },
    });

    if (existing) {
      continue;
    }

    await prisma.donor.create({
      data: {
        name,
        phone,
        address: faker.helpers.maybe(
          () => faker.location.streetAddress(),
          {
            probability: 0.8,
          },
        ),
        email: faker.helpers.maybe(
          () => faker.internet.email(),
          {
            probability: 0.7,
          },
        ),
      },
    });
  }

  console.log('✅ Donors seeded.');
}