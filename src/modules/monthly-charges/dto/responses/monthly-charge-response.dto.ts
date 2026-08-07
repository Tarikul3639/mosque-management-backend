import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../../../../common/enums/payment-status.enum';

export class MonthlyChargeResponseDto {
  @ApiProperty({
    example: 'cmf7l3b0d0000abcd1234efgh',
  })
  id!: string;

  @ApiProperty({
    example: 'cmf7l3b0d0000family123456',
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
    example: 300,
  })
  paidAmount!: number;

  @ApiProperty({
    enum: PaymentStatus,
    example: PaymentStatus.PARTIAL,
  })
  status!: PaymentStatus;

  @ApiProperty({
    example: '2026-07-31T00:00:00.000Z',
    nullable: true,
  })
  dueDate!: Date | null;

  @ApiProperty({
    example: '2026-07-10T12:30:00.000Z',
    nullable: true,
  })
  paidAt!: Date | null;

  @ApiProperty({
    example: '2026-07-01T09:00:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-07-10T12:30:00.000Z',
  })
  updatedAt!: Date;
}
