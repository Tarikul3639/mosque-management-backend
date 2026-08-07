import type { PrismaClient } from '../../src/lib/prisma/client';
import { UserRole } from '../../src/lib/prisma/client';
import { hashPassword } from '../../src/common/utils/hash';

export async function seedUsers(
    prisma: PrismaClient,
): Promise<void> {
    console.log('👤 Seeding super admin...');

    const role = await prisma.role.findUnique({
        where: {
            name: UserRole.SUPER_ADMIN,
        },
    });

    if (!role) {
        throw new Error('SUPER_ADMIN role not found.');
    }

    const password = await hashPassword(
        'Admin@123',
        10,
    );

    await prisma.user.upsert({
        where: {
            email: 'tarikulislam3639@gmail.com',
        },
        update: {},
        create: {
            roleId: role.id,
            name: 'Super Admin',
            email: 'tarikulislam3639@gmail.com',
            phone: '01700000000',
            password,
        },
    });

    console.log('✅ Super admin seeded.');
}