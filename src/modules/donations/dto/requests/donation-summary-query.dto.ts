import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';

import { PaymentMethod } from '@/lib/prisma/client';

export class DonationSummaryQueryDto {
  @ApiPropertyOptional({
    example: '2026-01-01',
  })
  @IsOptional()
  @IsDateString()
  fromDate!: string;

  @ApiPropertyOptional({
    example: '2026-12-31',
  })
  @IsOptional()
  @IsDateString()
  toDate!: string;

  @ApiPropertyOptional({
    enum: PaymentMethod,
  })
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;
}
