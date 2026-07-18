import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@/lib/prisma/client';

class DonorDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  fullName!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty({
    nullable: true,
  })
  email!: string | null;

  @ApiProperty({
    nullable: true,
  })
  address!: string | null;
}

class UserDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  fullName!: string;
}

export class DonationResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty({
    nullable: true,
  })
  purpose!: string | null;

  @ApiProperty()
  isAnonymous!: boolean;

  @ApiProperty()
  receiptNo!: string;

  @ApiProperty({
    enum: PaymentMethod,
  })
  paymentMethod!: PaymentMethod;

  @ApiProperty({
    nullable: true,
  })
  transactionReference!: string | null;

  @ApiProperty({
    nullable: true,
  })
  note!: string | null;

  @ApiProperty()
  donatedAt!: Date;

  @ApiProperty({
    type: DonorDto,
  })
  donor!: DonorDto;

  @ApiProperty({
    type: UserDto,
    nullable: true,
  })
  createdBy!: UserDto | null;

  @ApiProperty({
    type: UserDto,
    nullable: true,
  })
  updatedBy!: UserDto | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}