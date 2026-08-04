import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

import { PaymentMethod } from '@/lib/prisma/client';

export class UpdatePaymentDto {
  @ApiPropertyOptional({
    example: 500,
  })
  @IsOptional()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  amount?: number;

  @ApiPropertyOptional({
    enum: PaymentMethod,
    example: PaymentMethod.CASH,
  })
  @IsOptional()
  @IsEnum(PaymentMethod)
  method?: PaymentMethod;

  @ApiPropertyOptional({
    example: 'TXN-987654321',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  reference?: string;

  @ApiPropertyOptional({
    example: 'Payment corrected by admin',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;

  @ApiPropertyOptional({
    example: '2026-07-18T10:30:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  paidAt?: string;
}
