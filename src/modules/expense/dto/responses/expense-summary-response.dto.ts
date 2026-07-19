import { ApiProperty } from '@nestjs/swagger';

export class ExpenseSummaryResponseDto {
  @ApiProperty()
  totalExpenses!: number;

  @ApiProperty()
  totalAmount!: string;

  @ApiProperty()
  currentMonthAmount!: string;

  @ApiProperty()
  currentYearAmount!: string;
}