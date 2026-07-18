import { ApiProperty } from '@nestjs/swagger';

export class PaymentSummaryResponseDto {
  @ApiProperty({
    example: 125,
  })
  totalFamilies!: number;

  @ApiProperty({
    example: 120,
  })
  totalCharges!: number;

  @ApiProperty({
    example: 75,
  })
  paidCharges!: number;

  @ApiProperty({
    example: 20,
  })
  partialCharges!: number;

  @ApiProperty({
    example: 25,
  })
  dueCharges!: number;

  @ApiProperty({
    example: 65000,
  })
  totalChargeAmount!: number;

  @ApiProperty({
    example: 58000,
  })
  totalPaidAmount!: number;

  @ApiProperty({
    example: 7000,
  })
  totalDueAmount!: number;

  @ApiProperty({
    example: 148,
  })
  totalPayments!: number;

  @ApiProperty({
    example: 391.89,
  })
  averagePayment!: number;
}