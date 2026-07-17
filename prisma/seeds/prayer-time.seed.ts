import type { PrismaClient } from '@/lib/prisma/client';

export async function seedPrayerTime(
  prisma: PrismaClient,
): Promise<void> {
  console.log('🕌 Seeding prayer time...');

  const existing = await prisma.prayerTime.findFirst();

  if (existing) {
    console.log('⏩ Prayer time already exists. Skipping...');
    return;
  }

  await prisma.prayerTime.create({
    data: {
      fajr: '04:15 AM',
      sunrise: '05:35 AM',
      dhuhr: '12:05 PM',
      asr: '04:35 PM',
      maghrib: '06:45 PM',
      isha: '08:00 PM',
      jummah: '01:15 PM',
    },
  });

  console.log('✅ Prayer time seeded.');
}