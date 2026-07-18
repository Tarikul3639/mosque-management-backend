import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@/lib/prisma/client';

class DonationHistoryItemDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  receiptNo!: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty({
    nullable: true,
  })
  purpose!: string | null;

  @ApiProperty()
  paymentMethod!: PaymentMethod;

  @ApiProperty()
  donatedAt!: Date;
}

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

export class DonorHistoryResponseDto {
  @ApiProperty({
    type: DonorDto,
  })
  donor!: DonorDto;

  @ApiProperty()
  totalDonations!: number;

  @ApiProperty()
  totalAmount!: number;

  @ApiProperty({
    type: [DonationHistoryItemDto],
  })
  donations!: DonationHistoryItemDto[];
}