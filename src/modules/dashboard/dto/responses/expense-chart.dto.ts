import { ApiProperty } from '@nestjs/swagger';

export class ExpenseChartDto {
  @ApiProperty({
    example: 'Electricity',
    description: 'Expense category.',
  })
  category!: string;

  @ApiProperty({
    example: 25000,
    description: 'Total expense amount.',
  })
  amount!: number;
}
