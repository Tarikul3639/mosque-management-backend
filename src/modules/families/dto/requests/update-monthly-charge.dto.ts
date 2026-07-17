import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { PaymentStatus } from '@/lib/prisma/client';

export class UpdateMonthlyChargeDto {
  @ApiPropertyOptional({
    example: 500,
    description: 'Monthly charge amount',
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  amount?: number;

  @ApiPropertyOptional({
    example: 300,
    description: 'Paid amount',
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  paidAmount?: number;

  @ApiPropertyOptional({
    enum: PaymentStatus,
    example: PaymentStatus.PARTIAL,
  })
  @IsEnum(PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;

  @ApiPropertyOptional({
    example: 'cmf7l3b0d0000abcd1234efgh',
    description: 'Related payment ID',
  })
  @IsString()
  @IsOptional()
  paymentId?: string;

  @ApiPropertyOptional({
    example: '2026-07-10T00:00:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @ApiPropertyOptional({
    example: '2026-07-08T14:30:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  paidAt?: string;
}