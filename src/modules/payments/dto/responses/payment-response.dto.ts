import { ApiProperty } from '@nestjs/swagger';

import { PaymentMethod } from '@/lib/prisma/client';
import { PaymentStatus } from '@/common/enums/payment-status.enum';

export class PaymentResponseDto {
  @ApiProperty({
    example: 'cmf7payment123456',
  })
  id!: string;

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
    example: 'cmf7charge123456',
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
    example: 'Paid via bKash',
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
  updatedAt!: Date;
}
