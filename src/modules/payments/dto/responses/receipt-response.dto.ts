import { ApiProperty } from '@nestjs/swagger';

import { PaymentMethod } from '@/lib/prisma/client';
import { PaymentStatus } from '@/common/enums/payment-status.enum';

export class ReceiptResponseDto {
  @ApiProperty({
    example: 'MSJ-2026-000001',
    description: 'Unique receipt number for the payment transaction',
  })
  receiptNo!: string;

  @ApiProperty({
    example: 'cmfd9m6j80000abcd1234efgh',
    description: 'Unique identifier of the payment record',
  })
  paymentId!: string;

  @ApiProperty({
    example: 'cmfd9m6j80000family12345',
    description: 'Unique identifier of the family associated with the receipt',
  })
  familyId!: string;

  @ApiProperty({
    example: 'F-001',
    description: 'Family identification number or code',
  })
  familyNo!: string;

  @ApiProperty({
    example: 'Abdur Rahman',
    description: 'Name of the family head',
  })
  headName!: string;

  @ApiProperty({
    example: '01712345678',
    nullable: true,
    description: 'Contact phone number of the family',
  })
  phone!: string | null;

  @ApiProperty({
    example: 'House #12, Ward-03',
    nullable: true,
    description: 'Address of the family',
  })
  address!: string | null;

  @ApiProperty({
    example: 2026,
    description: 'Year associated with the monthly charge',
  })
  year!: number;

  @ApiProperty({
    example: 7,
    description: 'Month associated with the monthly charge',
  })
  month!: number;

  @ApiProperty({
    example: 500,
    description: 'Total assigned charge amount for the month',
  })
  chargeAmount!: number;

  @ApiProperty({
    example: 300,
    description: 'Amount paid in this specific transaction',
  })
  paymentAmount!: number;

  @ApiProperty({
    example: 300,
    description: 'Cumulative paid amount for the charge',
  })
  paidAmount!: number;

  @ApiProperty({
    enum: PaymentStatus,
    example: PaymentStatus.PARTIAL,
    description: 'Current status of the payment/charge',
  })
  status!: PaymentStatus;

  @ApiProperty({
    enum: PaymentMethod,
    example: PaymentMethod.CASH,
    description: 'Method used for the payment',
  })
  method!: PaymentMethod;

  @ApiProperty({
    example: 'TXN123456789',
    nullable: true,
    description: 'Transaction reference number or ID (if applicable)',
  })
  reference!: string | null;

  @ApiProperty({
    example: 'Monthly subscription',
    nullable: true,
    description: 'Additional notes regarding the receipt or payment',
  })
  note!: string | null;

  @ApiProperty({
    example: '2026-07-18T10:30:00.000Z',
    description: 'Date and time when the payment was made',
  })
  paidAt!: Date;

  @ApiProperty({
    example: '2026-07-18T10:30:00.000Z',
    description: 'Date and time when the record was created',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-07-18T10:35:00.000Z',
    description: 'Date and time when the receipt was generated',
  })
  generatedAt!: Date;
}