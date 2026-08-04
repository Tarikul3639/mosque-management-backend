import { ApiPropertyOptional } from '@nestjs/swagger';

import { PaymentMethod } from '@/lib/prisma/client';

import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateDonationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  donorId!: string;

  @ApiPropertyOptional({
    example: 1000,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  purpose!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isAnonymous!: boolean;

  @ApiPropertyOptional({
    enum: PaymentMethod,
  })
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  transactionReference!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  donatedAt!: string;
}
