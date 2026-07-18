import { ApiProperty } from '@nestjs/swagger';

import {
  PaymentMethod,
  PaymentStatus,
} from '@/lib/prisma/client';

export class ReceiptResponseDto {
  @ApiProperty({
    example: 'MSJ-2026-000001',
  })
  receiptNo!: string;

  @ApiProperty({
    example: 'cmfd9m6j80000abcd1234efgh',
  })
  paymentId!: string;

  @ApiProperty({
    example: 'cmfd9m6j80000family12345',
  })
  familyId!: string;

  @ApiProperty({
    example: 'F-001',
  })
  familyNo!: string;

  @ApiProperty({
    example: 'Abdur Rahman',
  })
  headName!: string;

  @ApiProperty({
    example: '01712345678',
    nullable: true,
  })
  phone!: string | null;

  @ApiProperty({
    example: 'House #12, Ward-03',
    nullable: true,
  })
  address!: string | null;

  @ApiProperty({
    example: 2026,
  })
  year!: number;

  @ApiProperty({
    example: 7,
  })
  month!: number;

  @ApiProperty({
    example: 500,
  })
  chargeAmount!: number;

  @ApiProperty({
    example: 300,
  })
  paymentAmount!: number;

  @ApiProperty({
    example: 300,
  })
  paidAmount!: number;

  @ApiProperty({
    enum: PaymentStatus,
    example: PaymentStatus.PARTIAL,
  })
  status!: PaymentStatus;

  @ApiProperty({
    enum: PaymentMethod,
    example: PaymentMethod.CASH,
  })
  method!: PaymentMethod;

  @ApiProperty({
    example: 'TXN123456789',
    nullable: true,
  })
  reference!: string | null;

  @ApiProperty({
    example: 'Monthly subscription',
    nullable: true,
  })
  note!: string | null;

  @ApiProperty({
    example: '2026-07-18T10:30:00.000Z',
  })
  paidAt!: Date;

  @ApiProperty({
    example: '2026-07-18T10:30:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-07-18T10:35:00.000Z',
  })
  generatedAt!: Date;
}