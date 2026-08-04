import type { PrismaClient } from '@/lib/prisma/client';

export async function seedMonthlyCharges(
  prisma: PrismaClient,
): Promise<void> {
  console.log('📅 Seeding monthly charges...');

  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const families = await prisma.family.findMany({
    include: {
      feeHistory: {
        where: {
          endDate: null,
        },
        take: 1,
      },
    },
  });

  for (const family of families) {
    const fee = family.feeHistory[0];

    if (!fee) {
      continue;
    }

    const existing = await prisma.monthlyCharge.findFirst({
      where: {
        familyId: family.id,
        year,
        month,
      },
    });

    if (existing) {
      continue;
    }

    await prisma.monthlyCharge.create({
      data: {
        familyId: family.id,
        familyFeeId: fee.id,

        year,
        month,

        amount: fee.monthlyFee,
      },
    });
  }

  console.log('✅ Monthly charges seeded.');
}