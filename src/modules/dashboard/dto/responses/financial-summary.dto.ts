import { ApiProperty } from '@nestjs/swagger';

export class FinancialSummaryDto {
  @ApiProperty({
    example: 250000,
  })
  totalCollection!: number;

  @ApiProperty({
    example: 175000,
  })
  totalExpense!: number;

  @ApiProperty({
    example: 75000,
  })
  balance!: number;

  @ApiProperty({
    example: 70,
    description: 'Collection percentage of total collection.',
  })
  collectionPercentage!: number;

  @ApiProperty({
    example: 70,
    description: 'Expense percentage of total collection.',
  })
  expensePercentage!: number;

  @ApiProperty({
    example: 30,
    description: 'Remaining balance percentage.',
  })
  balancePercentage!: number;
}
