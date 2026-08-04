import { ApiProperty } from '@nestjs/swagger';

import { PaymentMethod } from '@/lib/prisma/client';

export class RecentDonationDto {
  @ApiProperty({
    example: 'a3f47a2d-f2a7-4cb3-b7d2-8e2f6f37d8d4',
  })
  id!: string;

  @ApiProperty({
    example: 'Abdul Karim',
  })
  donorName!: string;

  @ApiProperty({
    example: 5000,
  })
  amount!: number;

  @ApiProperty({
    example: 'DON-000001',
  })
  receiptNo!: string;

  @ApiProperty({
    enum: PaymentMethod,
    example: PaymentMethod.CASH,
  })
  paymentMethod!: PaymentMethod;

  @ApiProperty({
    example: '2026-07-20T08:30:00.000Z',
  })
  donatedAt!: Date;
}
