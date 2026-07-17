import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFamilyFeeDto {
  @ApiProperty({
    example: 500,
    description: 'Monthly fee amount',
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  monthlyFee!: number;

  @ApiProperty({
    example: '2026-01-01',
    description: 'Fee effective start date',
  })
  @IsDateString()
  startDate!: string;

  @ApiProperty({
    example: '2026-12-31',
    required: false,
    description: 'Fee effective end date',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}