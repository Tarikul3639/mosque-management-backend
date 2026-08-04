import { ApiProperty } from '@nestjs/swagger';

import { DonationResponseDto } from './donation-response.dto';

export class DonationListResponseDto {
  @ApiProperty({
    description: 'List of donations',
    type: DonationResponseDto,
    isArray: true,
  })
  data!: DonationResponseDto[];

  @ApiProperty({
    description: 'Total number of donations',
    example: 125,
  })
  total!: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page!: number;

  @ApiProperty({
    description: 'Number of records per page',
    example: 10,
  })
  limit!: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 13,
  })
  totalPages!: number;
}
