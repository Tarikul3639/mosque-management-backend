import { ApiProperty } from '@nestjs/swagger';

export class DashboardSummaryDto {
  @ApiProperty({
    example: 1250000,
    description: 'Total donation amount.',
  })
  totalDonation!: number;

  @ApiProperty({
    example: 450000,
    description: 'Total expense amount.',
  })
  totalExpense!: number;

  @ApiProperty({
    example: 800000,
    description: 'Current balance.',
  })
  balance!: number;

  @ApiProperty({
    example: 95000,
    description: 'Donation received this month.',
  })
  monthlyDonation!: number;

  @ApiProperty({
    example: 32000,
    description: 'Expense recorded this month.',
  })
  monthlyExpense!: number;

  @ApiProperty({
    example: 63000,
    description: 'Monthly balance.',
  })
  monthlyBalance!: number;
}
