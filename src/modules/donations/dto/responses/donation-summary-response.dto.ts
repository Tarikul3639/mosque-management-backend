import { ApiProperty } from '@nestjs/swagger';

export class DonationSummaryResponseDto {
  @ApiProperty({
    example: 185,
  })
  totalDonations!: number;

  @ApiProperty({
    example: 125430,
  })
  totalAmount!: number;

  @ApiProperty({
    example: 678.54,
  })
  averageAmount!: number;
}