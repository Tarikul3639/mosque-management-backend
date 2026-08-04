import { ApiProperty } from '@nestjs/swagger';

export class PaymentSummaryResponseDto {
  @ApiProperty({
    example: 125,
    description: 'Total number of active families registered in the system',
  })
  totalFamilies!: number;

  @ApiProperty({
    example: 120,
    description: 'Total number of monthly charges generated for the period',
  })
  totalCharges!: number;

  @ApiProperty({
    example: 75,
    description: 'Total number of monthly charges that are fully paid',
  })
  paidCharges!: number;

  @ApiProperty({
    example: 20,
    description: 'Total number of monthly charges that have partial payments',
  })
  partialCharges!: number;

  @ApiProperty({
    example: 25,
    description:
      'Total number of monthly charges that are completely due/unpaid',
  })
  dueCharges!: number;

  @ApiProperty({
    example: 65000,
    description: 'Total cumulative amount expected from all generated charges',
  })
  totalChargeAmount!: number;

  @ApiProperty({
    example: 58000,
    description: 'Total cumulative amount actually collected through payments',
  })
  totalPaidAmount!: number;

  @ApiProperty({
    example: 7000,
    description: 'Total remaining due amount across all charges',
  })
  totalDueAmount!: number;

  @ApiProperty({
    example: 148,
    description:
      'Total number of payment transactions recorded during the period',
  })
  totalPayments!: number;

  @ApiProperty({
    example: 391.89,
    description: 'Average payment amount per transaction',
  })
  averagePayment!: number;
}
