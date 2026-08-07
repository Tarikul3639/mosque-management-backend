import { Module } from '@nestjs/common';

import { PrismaModule } from '../../common/prisma/prisma.module';
import { PrayerTimesController } from './controllers/prayer-times.controller';

import { GetPrayerTimeService } from './services/get-prayer-time.service';
import { UpdatePrayerTimeService } from './services/update-prayer-time.service';

@Module({
  imports: [PrismaModule],

  controllers: [PrayerTimesController],

  providers: [GetPrayerTimeService, UpdatePrayerTimeService],

  exports: [GetPrayerTimeService, UpdatePrayerTimeService],
})
export class PrayerTimesModule {}
