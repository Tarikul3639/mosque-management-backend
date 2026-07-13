import type { PrismaClient } from '@/lib/prisma/client';
import { UserRole } from '@/lib/prisma/client';

export async function seedRoles(
    prisma: PrismaClient,
): Promise<void> {
    console.log('📦 Seeding roles...');

    const roles = [
        {
            name: UserRole.SUPER_ADMIN,
            description: 'Super Administrator',
        },
        {
            name: UserRole.ADMIN,
            description: 'Administrator',
        },
    ];

    for (const role of roles) {
        await prisma.role.upsert({
            where: {
                name: role.name,
            },
            update: {
                description: role.description,
            },
            create: role,
        });
    }

    console.log('✅ Roles seeded.');
}