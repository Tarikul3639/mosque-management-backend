import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PrayerTimeResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  fajr!: string;

  @ApiPropertyOptional()
  sunrise!: string | null;

  @ApiProperty()
  dhuhr!: string;

  @ApiProperty()
  asr!: string;

  @ApiProperty()
  maghrib!: string;

  @ApiProperty()
  isha!: string;

  @ApiPropertyOptional()
  jummah!: string | null;

  @ApiPropertyOptional()
  createdAt!: Date | null;

  @ApiPropertyOptional()
  updatedAt!: Date | null;
}
