import { ApiProperty } from '@nestjs/swagger';

export class GenerateMonthlyChargesResponseDto {
  @ApiProperty({
    example: 'Monthly charges generated successfully.',
  })
  message!: string;

  @ApiProperty({
    example: 120,
    description: 'Total active families processed',
  })
  totalFamilies!: number;

  @ApiProperty({
    example: 115,
    description: 'New monthly charges created',
  })
  generatedCharges!: number;

  @ApiProperty({
    example: 5,
    description: 'Charges skipped because they already existed',
  })
  skippedCharges!: number;

  @ApiProperty({
    example: 2026,
  })
  year!: number;

  @ApiProperty({
    example: 7,
  })
  month!: number;
}
