import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateFamilyFeeDto {
  @ApiPropertyOptional({
    example: 600,
    description: 'Monthly fee amount',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  monthlyFee?: number;

  @ApiPropertyOptional({
    example: '2026-01-01',
    description: 'Fee effective start date',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2026-12-31',
    description: 'Fee effective end date',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
