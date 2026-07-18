import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { PaymentMethod } from '@/lib/prisma/client';

export class DonationQueryDto {
  @ApiPropertyOptional({
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page!: number;

  @ApiPropertyOptional({
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search!: string;

  @ApiPropertyOptional({
    enum: PaymentMethod,
  })
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @ApiPropertyOptional({
    example: "2026-01-01",
  })
  @IsOptional()
  fromDate!: string;

  @ApiPropertyOptional({
    example: "2026-12-31",
  })
  @IsOptional()
  toDate!: string;
}