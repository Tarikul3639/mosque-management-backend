import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '@/lib/prisma/client';

class FamilyLedgerItemResponseDto {
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
  amount!: number;

  @ApiProperty({
    example: 500,
  })
  paidAmount!: number;

  @ApiProperty({
    enum: PaymentStatus,
    example: PaymentStatus.PAID,
  })
  status!: PaymentStatus;

  @ApiProperty({
    example: '2026-07-15T10:30:00.000Z',
    required: false,
    nullable: true,
  })
  paidAt?: Date | null;
}

export class FamilyLedgerResponseDto {
  @ApiProperty({
    example: 'cmf8x8x8x0001abcd1234',
  })
  familyId!: string;

  @ApiProperty({
    example: 'FAM-0001',
  })
  familyNo!: string;

  @ApiProperty({
    example: 'Abdul Karim',
  })
  headName!: string;

  @ApiProperty({
    example: 6000,
    description: 'Total charge amount',
  })
  totalAmount!: number;

  @ApiProperty({
    example: 5000,
    description: 'Total paid amount',
  })
  totalPaid!: number;

  @ApiProperty({
    example: 1000,
    description: 'Total due amount',
  })
  totalDue!: number;

  @ApiProperty({
    type: [FamilyLedgerItemResponseDto],
  })
  ledger!: FamilyLedgerItemResponseDto[];
}