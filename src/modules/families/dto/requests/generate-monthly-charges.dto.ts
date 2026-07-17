import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class GenerateMonthlyChargesDto {
  @ApiProperty({
    example: 2026,
    description: 'Charge generation year',
  })
  @Type(() => Number)
  @IsInt()
  @Min(2000)
  @Max(2100)
  year!: number;

  @ApiProperty({
    example: 7,
    description: 'Charge generation month (1-12)',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  month!: number;
}