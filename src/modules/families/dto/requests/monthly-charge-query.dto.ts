import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { PaymentStatus } from '@/lib/prisma/client';

export class MonthlyChargeQueryDto {
  @ApiPropertyOptional({
    example: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({
    example: 'F001',
    description: 'Family number or head name',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    example: 2026,
  })
  @Type(() => Number)
  @IsInt()
  @Min(2000)
  @Max(2100)
  @IsOptional()
  year?: number;

  @ApiPropertyOptional({
    example: 7,
    minimum: 1,
    maximum: 12,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  @IsOptional()
  month?: number;

  @ApiPropertyOptional({
    enum: PaymentStatus,
    example: PaymentStatus.DUE,
  })
  @IsOptional()
  status?: PaymentStatus;

  @ApiPropertyOptional({
    example: true,
    description: 'Filter active families only',
  })
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  activeOnly?: boolean = true;
}