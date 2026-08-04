import { ApiProperty } from '@nestjs/swagger';

export class PaymentSummaryResponseDto {
  @ApiProperty({
    example: 125,
    description: 'Total number of families',
  })
  totalFamilies!: number;

  @ApiProperty({
    example: 120,
    description: 'Total number of monthly charges',
  })
  totalCharges!: number;

  @ApiProperty({
    example: 75,
    description: 'Total number of fully paid charges',
  })
  paidCharges!: number;

  @ApiProperty({
    example: 20,
    description: 'Total number of partially paid charges',
  })
  partialCharges!: number;

  @ApiProperty({
    example: 25,
    description: 'Total number of unpaid or due charges',
  })
  dueCharges!: number;

  @ApiProperty({
    example: 65000,
    description: 'Total expected charge amount',
  })
  totalChargeAmount!: number;

  @ApiProperty({
    example: 58000,
    description: 'Total collected paid amount',
  })
  totalPaidAmount!: number;

  @ApiProperty({
    example: 7000,
    description: 'Total remaining due amount',
  })
  totalDueAmount!: number;

  @ApiProperty({
    example: 148,
    description: 'Total count of payment transactions',
  })
  totalPayments!: number;

  @ApiProperty({
    example: 391.89,
    description: 'Average payment amount per transaction',
  })
  averagePayment!: number;
}