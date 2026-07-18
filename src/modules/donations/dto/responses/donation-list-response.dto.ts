import { ApiProperty } from '@nestjs/swagger';

import { DonationResponseDto } from './donation-response.dto';

export class DonationListResponseDto {
  @ApiProperty()
  data!: DonationResponseDto[];

  @ApiProperty()
  total!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;

  @ApiProperty()
  totalPages!: number;
}