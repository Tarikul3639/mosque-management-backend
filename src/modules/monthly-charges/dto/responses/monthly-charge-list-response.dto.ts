import { ApiProperty } from '@nestjs/swagger';

import { MonthlyChargeResponseDto } from './monthly-charge-response.dto';

class MonthlyChargeListMetadata {
  @ApiProperty({
    example: 125,
  })
  total!: number;

  @ApiProperty({
    example: 1,
  })
  page!: number;

  @ApiProperty({
    example: 10,
  })
  limit!: number;

  @ApiProperty({
    example: 13,
  })
  totalPages!: number;

  @ApiProperty({
    example: true,
  })
  hasNextPage!: boolean;

  @ApiProperty({
    example: false,
  })
  hasPreviousPage!: boolean;
}

export class MonthlyChargeListResponseDto {
  @ApiProperty({
    type: [MonthlyChargeResponseDto],
  })
  data!: MonthlyChargeResponseDto[];

  @ApiProperty({
    type: MonthlyChargeListMetadata,
  })
  metadata!: MonthlyChargeListMetadata;
}
