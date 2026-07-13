import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '@/lib/prisma/client';

import { seedRoles } from './seeds/role.seed';
import { seedUsers } from './seeds/user.seed';
import { seedCommittee } from './seeds/committee.seed';
import { seedFamilies } from './seeds/family.seed';
import { seedGallery } from './seeds/gallery.seed';
import { seedCollections } from './seeds/collection.seed';
import { seedDonations } from './seeds/donation.seed';
import { seedExpenses } from './seeds/expense.seed';
import { seedDevelopmentProjects } from './seeds/development-project.seed';

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL!,
    }),
});

async function main(): Promise<void> {
    console.log('🌱 Seeding database...\n');

    await seedRoles(prisma);
    await seedUsers(prisma);

    await seedCommittee(prisma);
    await seedFamilies(prisma);
    await seedGallery(prisma);

    await seedCollections(prisma);
    await seedDonations(prisma);
    await seedExpenses(prisma);
    await seedDevelopmentProjects(prisma);

    console.log('\n✅ Database seeded successfully.');
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });