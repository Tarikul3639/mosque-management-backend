import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../common/prisma/prisma.service';

import { UpdatePrayerTimeDto } from '../dto/requests/update-prayer-time.dto';
import { PrayerTimeResponseDto } from '../dto/responses/prayer-time-response.dto';

@Injectable()
export class UpdatePrayerTimeService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(dto: UpdatePrayerTimeDto): Promise<PrayerTimeResponseDto> {
    const existingPrayerTime = await this.prisma.prayerTime.findFirst({
      select: {
        id: true,
      },
    });

    if (!existingPrayerTime) {
      return this.prisma.prayerTime.create({
        data: {
          fajr: dto.fajr ?? '5:00 AM',
          sunrise: dto.sunrise ?? '6:30 AM',
          dhuhr: dto.dhuhr ?? '12:00 PM',
          asr: dto.asr ?? '3:00 PM',
          maghrib: dto.maghrib ?? '6:00 PM',
          isha: dto.isha ?? '7:00 PM',
          jummah: dto.jummah ?? '1:30 PM',
        },
      });
    }

    return this.prisma.prayerTime.update({
      where: {
        id: existingPrayerTime.id,
      },
      data: {
        ...(dto.fajr !== undefined && {
          fajr: dto.fajr,
        }),
        ...(dto.sunrise !== undefined && {
          sunrise: dto.sunrise,
        }),
        ...(dto.dhuhr !== undefined && {
          dhuhr: dto.dhuhr,
        }),
        ...(dto.asr !== undefined && {
          asr: dto.asr,
        }),
        ...(dto.maghrib !== undefined && {
          maghrib: dto.maghrib,
        }),
        ...(dto.isha !== undefined && {
          isha: dto.isha,
        }),
        ...(dto.jummah !== undefined && {
          jummah: dto.jummah,
        }),
      },
    });
  }
}
