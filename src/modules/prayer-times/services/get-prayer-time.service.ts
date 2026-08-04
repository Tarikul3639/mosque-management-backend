import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { PrayerTimeResponseDto } from '../dto/responses/prayer-time-response.dto';

@Injectable()
export class GetPrayerTimeService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<PrayerTimeResponseDto> {
    const prayerTime = await this.prisma.prayerTime.findFirst();

    if (!prayerTime) {
      return {
        id: '',
        fajr: '',
        sunrise: null,
        dhuhr: '',
        asr: '',
        maghrib: '',
        isha: '',
        jummah: null,
        createdAt: null,
        updatedAt: null,
      };
    }

    return prayerTime;
  }
}
