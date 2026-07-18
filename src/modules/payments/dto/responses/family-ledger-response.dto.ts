import { ApiProperty } from '@nestjs/swagger';

import {
  PaymentMethod,
  PaymentStatus,
} from '@/lib/prisma/client';

export class PaymentLedgerDto {
  @ApiProperty({
    example: 'cmf7payment123456',
  })
  id!: string;

  @ApiProperty({
    example: 300,
  })
  amount!: number;

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
    example: 'Paid via bKash',
    nullable: true,
  })
  note!: string | null;

  @ApiProperty({
    example: '2026-07-18T10:30:00.000Z',
  })
  paidAt!: Date;
}

export class FamilyLedgerItemDto {
  @ApiProperty({
    example: 'cmf123456789',
  })
  monthlyChargeId!: string;

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
    example: 500,
  })
  paidAmount!: number;

  @ApiProperty({
    example: 0,
  })
  dueAmount!: number;

  @ApiProperty({
    enum: PaymentStatus,
    example: PaymentStatus.PAID,
  })
  status!: PaymentStatus;

  @ApiProperty({
    type: [PaymentLedgerDto],
  })
  payments!: PaymentLedgerDto[];
}

export class FamilyLedgerSummaryDto {
  @ApiProperty({
    example: 6000,
  })
  totalCharge!: number;

  @ApiProperty({
    example: 5500,
  })
  totalPaid!: number;

  @ApiProperty({
    example: 500,
  })
  totalDue!: number;
}

export class FamilyLedgerResponseDto {
  @ApiProperty({
    example: 'cmf7family123456',
  })
  familyId!: string;

  @ApiProperty({
    example: 'F001',
  })
  familyNo!: string;

  @ApiProperty({
    example: 'Abdul Karim',
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
    type: FamilyLedgerSummaryDto,
  })
  summary!: FamilyLedgerSummaryDto;

  @ApiProperty({
    type: [FamilyLedgerItemDto],
  })
  ledger!: FamilyLedgerItemDto[];
}