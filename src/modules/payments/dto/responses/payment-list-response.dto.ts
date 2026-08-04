import { ApiProperty } from '@nestjs/swagger';
import { PaymentResponseDto } from './payment-response.dto';

class PaymentListResponseMeta {
  @ApiProperty({
    example: 125,
    description: 'Total number of payment records matching the query',
  })
  total!: number;

  @ApiProperty({
    example: 1,
    description: 'Current page number',
  })
  page!: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
  })
  limit!: number;

  @ApiProperty({
    example: 13,
    description: 'Total number of available pages',
  })
  totalPages!: number;

  @ApiProperty({
    example: true,
    description: 'Indicates whether there is a next page available',
  })
  hasNextPage!: boolean;

  @ApiProperty({
    example: false,
    description: 'Indicates whether there is a previous page available',
  })
  hasPreviousPage!: boolean;
}

export class PaymentListResponseDto {
  @ApiProperty({
    type: [PaymentResponseDto],
    description: 'List of payment records',
  })
  data!: PaymentResponseDto[];

  @ApiProperty({
    type: PaymentListResponseMeta,
    description: 'Pagination metadata',
  })
  meta!: PaymentListResponseMeta;
}
