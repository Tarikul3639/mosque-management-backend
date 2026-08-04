import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@/lib/prisma/client';

class DonorDto {
  @ApiProperty({
    description: 'Unique donor identifier',
    format: 'uuid',
    example: '6c2a9d2d-2d39-4d2e-8d49-53b76fd0b8d4',
  })
  id!: string;

  @ApiProperty({
    description: 'Donor full name',
    example: 'Abdul Karim',
  })
  name!: string;

  @ApiProperty({
    description: 'Donor phone number',
    example: '01712345678',
  })
  phone!: string;

  @ApiProperty({
    description: 'Donor email address',
    example: 'abdul@example.com',
    nullable: true,
    required: false,
  })
  email!: string | null;

  @ApiProperty({
    description: 'Donor address',
    example: 'Dhaka, Bangladesh',
    nullable: true,
    required: false,
  })
  address!: string | null;
}

class UserDto {
  @ApiProperty({
    description: 'Unique user identifier',
    format: 'uuid',
    example: '2bc928ef-fd4c-48f2-a875-8732d0dbd37f',
  })
  id!: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Administrator',
  })
  name!: string;
}

export class DonationResponseDto {
  @ApiProperty({
    description: 'Unique donation identifier',
    format: 'uuid',
    example: '8eb41ec6-5c94-44b6-8854-21b2d4fb5c6e',
  })
  id!: string;

  @ApiProperty({
    description: 'Donation amount',
    example: 5000,
  })
  amount!: number;

  @ApiProperty({
    description: 'Donation purpose',
    example: 'Mosque Development Fund',
    nullable: true,
    required: false,
  })
  purpose!: string | null;

  @ApiProperty({
    description: 'Whether the donation is anonymous',
    example: false,
  })
  isAnonymous!: boolean;

  @ApiProperty({
    description: 'Donation receipt number',
    example: 'DON-20260730-0001',
  })
  receiptNo!: string;

  @ApiProperty({
    description: 'Payment method',
    enum: PaymentMethod,
    example: PaymentMethod.CASH,
  })
  paymentMethod!: PaymentMethod;

  @ApiProperty({
    description: 'Payment transaction reference',
    example: 'TXN-8KQY9281',
    nullable: true,
    required: false,
  })
  transactionReference!: string | null;

  @ApiProperty({
    description: 'Additional donation note',
    example: 'May Allah accept this donation.',
    nullable: true,
    required: false,
  })
  note!: string | null;

  @ApiProperty({
    description: 'Donation date and time',
    format: 'date-time',
    example: '2026-07-30T09:30:00.000Z',
  })
  donatedAt!: Date;

  @ApiProperty({
    description: 'Donor information',
    type: DonorDto,
  })
  donor!: DonorDto;

  @ApiProperty({
    description: 'User who created this donation',
    type: UserDto,
    nullable: true,
    required: false,
  })
  createdBy!: UserDto | null;

  @ApiProperty({
    description: 'User who last updated this donation',
    type: UserDto,
    nullable: true,
    required: false,
  })
  updatedBy!: UserDto | null;

  @ApiProperty({
    description: 'Record creation timestamp',
    format: 'date-time',
    example: '2026-07-30T09:30:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Record last update timestamp',
    format: 'date-time',
    example: '2026-07-30T10:15:00.000Z',
  })
  updatedAt!: Date;
}
