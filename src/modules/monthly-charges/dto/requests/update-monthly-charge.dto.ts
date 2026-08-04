import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, Min } from 'class-validator';

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
    example: '2026-07-10T00:00:00.000Z',
    description: 'Payment due date',
  })
  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
