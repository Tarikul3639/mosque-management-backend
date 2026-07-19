import { PartialType } from '@nestjs/swagger';
import { PrayerTimeResponseDto } from '../responses/prayer-time-response.dto';

export class UpdatePrayerTimeDto extends PartialType(
  PrayerTimeResponseDto,
) {}