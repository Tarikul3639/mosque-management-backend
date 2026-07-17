import { ApiProperty } from '@nestjs/swagger';

import { FamilyResponseDto } from './family-response.dto';

export class FamilyListResponseDto {
  @ApiProperty({
    type: [FamilyResponseDto],
  })
  data!: FamilyResponseDto[];

  @ApiProperty({
    example: 125,
    description: 'Total number of families',
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
    description: 'Total pages',
  })
  totalPages!: number;
}