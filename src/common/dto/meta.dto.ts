import { ApiProperty } from '@nestjs/swagger';

export class MetaDto {
  @ApiProperty({ description: 'Current page number', example: 1 })
  page!: number;

  @ApiProperty({ description: 'Items per page', example: 10 })
  limit!: number;

  @ApiProperty({ description: 'Total items count', example: 50 })
  total!: number;

  @ApiProperty({ description: 'Total pages count', example: 5 })
  totalPages!: number;

  @ApiProperty({ description: 'Has next page', example: true })
  hasNextPage!: boolean;

  @ApiProperty({ description: 'Has previous page', example: false })
  hasPreviousPage!: boolean;
}
