import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '@/lib/prisma/client';
import { seedPrayerTime } from './seeds/prayer-time.seed';

import { seedFamilyFees } from './seeds/family-fees.seed';
import { seedMonthlyCharges } from './seeds/monthly-charges.seed';
import { seedPayments } from './seeds/payments.seed';
import { seedDonors } from './seeds/donor.seed';

import { seedRoles } from './seeds/role.seed';
import { seedUsers } from './seeds/user.seed';
import { seedCommittee } from './seeds/committee.seed';
import { seedFamilies } from './seeds/family.seed';
import { seedGallery } from './seeds/gallery.seed';
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

    // Auth
    await seedRoles(prisma);
    await seedUsers(prisma);

    // Committee
    await seedCommittee(prisma);

    // Families
    await seedFamilies(prisma);
    await seedFamilyFees(prisma);
    await seedMonthlyCharges(prisma);
    await seedPayments(prisma);

    // Donors & Donations
    await seedDonors(prisma);
    await seedDonations(prisma);

    // Others
    await seedExpenses(prisma);
    await seedDevelopmentProjects(prisma);
    await seedGallery(prisma);

    // Payer Times
    await seedPrayerTime(prisma);

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