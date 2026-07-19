import { ApiProperty } from '@nestjs/swagger';

import { GalleryResponseDto } from './gallery-response.dto';

class PaginationMetaDto {
  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;

  @ApiProperty()
  total!: number;

  @ApiProperty()
  totalPages!: number;
}

export class GalleryListResponseDto {
  @ApiProperty({
    type: [GalleryResponseDto],
  })
  data!: GalleryResponseDto[];

  @ApiProperty({
    type: PaginationMetaDto,
  })
  meta!: PaginationMetaDto;
}