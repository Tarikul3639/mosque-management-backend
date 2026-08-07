import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

import { PaymentMethod } from '../../../../lib/prisma/client';

export class CreatePaymentDto {
  @ApiProperty({
    example: '2c4b3b78-6d88-4c97-8af0-7b7b8b7a1d92',
  })
  @IsString()
  @IsNotEmpty()
  familyId!: string;

  @ApiProperty({
    example: '51d5dcdc-c2cb-41f2-97aa-1ef3d2dc3d84',
  })
  @IsString()
  @IsNotEmpty()
  monthlyChargeId!: string;

  @ApiProperty({
    example: 500,
    description: 'Payment amount',
  })
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  amount!: number;

  @ApiProperty({
    enum: PaymentMethod,
    example: PaymentMethod.CASH,
  })
  @IsEnum(PaymentMethod)
  method!: PaymentMethod;

  @ApiPropertyOptional({
    example: 'TXN-987654321',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  reference?: string;

  @ApiPropertyOptional({
    example: 'Paid via bKash',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;

  @ApiPropertyOptional({
    example: '2026-07-18T10:30:00.000Z',
    description: 'If omitted, current date & time will be used.',
  })
  @IsOptional()
  @IsDateString()
  paidAt?: string;
}
