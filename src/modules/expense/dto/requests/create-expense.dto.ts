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

import { ExpenseCategory } from '@/lib/prisma/client';

export class CreateExpenseDto {
  @ApiProperty({
    enum: ExpenseCategory,
    example: ExpenseCategory.ELECTRICITY,
  })
  @IsEnum(ExpenseCategory)
  category!: ExpenseCategory;

  @ApiProperty({
    example: 'Electricity Bill',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title!: string;

  @ApiProperty({
    example: 2500,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount!: number;

  @ApiPropertyOptional({
    example: 'June electricity bill',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;

  @ApiProperty({
    example: '2026-07-19',
  })
  @IsDateString()
  expenseDate!: string;
}
