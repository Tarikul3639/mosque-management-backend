import type { PrismaClient } from '../../src/lib/prisma/client';
import { CommitteeRole } from '../../src/lib/prisma/client';

import { faker } from '@faker-js/faker';

export async function seedCommittee(
    prisma: PrismaClient,
): Promise<void> {
    console.log('👥 Seeding committee members...');

    const designations = Object.values(CommitteeRole);

    for (const designation of designations) {
        await prisma.committeeMember.create({
            data: {
                name: faker.person.fullName(),
                designation,
                phone: faker.phone.number(),
                email: faker.internet.email(),
                address: faker.location.streetAddress(),
                joiningDate: faker.date.past(),
                isActive: true,
            },
        });
    }

    console.log('✅ Committee members seeded.');
}