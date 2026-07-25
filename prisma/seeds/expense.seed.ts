import type { PrismaClient } from '@/lib/prisma/client';

import { ExpenseCategory } from '@/lib/prisma/client';

import { faker } from '@faker-js/faker';

export async function seedExpenses(
    prisma: PrismaClient,
): Promise<void> {
    console.log('💸 Seeding expenses...');

    const users = await prisma.user.findMany({
        select: {
            id: true,
        },
    });

    const categories = Object.values(ExpenseCategory);

    for (let i = 0; i < 10; i++) {
        const user = faker.helpers.arrayElement(users);

        await prisma.expense.create({
            data: {
                category: faker.helpers.arrayElement(categories),
                title: faker.commerce.productName(),
                amount: faker.number.float({
                    min: 100,
                    max: 50000,
                    fractionDigits: 2,
                }),
                note: faker.lorem.sentence(),
                expenseDate: faker.date.recent(),
                createdById: user.id,
            },
        });
    }

    console.log('✅ Expenses seeded.');
}