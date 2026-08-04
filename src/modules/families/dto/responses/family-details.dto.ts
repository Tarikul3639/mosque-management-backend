import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class FamilyAvatarDto {
  @ApiProperty({
    example: 'cmf8x8x8x0001abcd1234',
  })
  id!: string;

  @ApiProperty({
    example: 'https://example.com/uploads/families/avatar.jpg',
  })
  url!: string;
}

class CurrentFeeDto {
  @ApiProperty({
    example: 'cmf8fee001',
  })
  id!: string;

  @ApiProperty({
    example: 500,
  })
  monthlyFee!: number;

  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
  })
  startDate!: Date;

  @ApiPropertyOptional({
    example: null,
    nullable: true,
  })
  endDate!: Date | null;
}

class PaymentSummaryDto {
  @ApiProperty({
    example: 4500,
    description: 'Total amount paid by the family.',
  })
  totalPaid!: number;

  @ApiProperty({
    example: 500,
    description: 'Current total due amount.',
  })
  totalDue!: number;

  @ApiPropertyOptional({
    example: '2026-07-18T10:30:00.000Z',
    nullable: true,
    description: 'Last payment date.',
  })
  lastPaymentAt!: Date | null;
}

export class FamilyDetailsResponseDto {
  @ApiProperty({
    example: 'cmf8x8x8x0001abcd1234',
  })
  id!: string;

  @ApiProperty({
    example: 'FAM-0001',
  })
  familyNo!: string;

  @ApiProperty({
    example: 'Abdul Karim',
  })
  headName!: string;

  @ApiPropertyOptional({
    example: '01712345678',
    nullable: true,
  })
  phone!: string | null;

  @ApiPropertyOptional({
    example: 'Village: Rathura, Kaliganj, Gazipur',
    nullable: true,
  })
  address!: string | null;

  @ApiPropertyOptional({
    type: FamilyAvatarDto,
    nullable: true,
  })
  avatar!: FamilyAvatarDto | null;

  @ApiProperty({
    example: true,
  })
  isActive!: boolean;

  @ApiPropertyOptional({
    type: CurrentFeeDto,
    nullable: true,
    description: 'Current monthly fee information.',
  })
  currentFee!: CurrentFeeDto | null;

  @ApiProperty({
    type: PaymentSummaryDto,
    description: 'Payment summary for the family.',
  })
  paymentSummary!: PaymentSummaryDto;

  @ApiProperty({
    example: '2026-07-18T10:30:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-07-18T10:30:00.000Z',
  })
  updatedAt!: Date;
}
