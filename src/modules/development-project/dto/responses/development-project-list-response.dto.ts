import { ApiProperty } from '@nestjs/swagger';
import { DevelopmentProjectResponseDto } from './development-project-response.dto';

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

export class DevelopmentProjectListResponseDto {
  @ApiProperty({
    type: [DevelopmentProjectResponseDto],
  })
  data!: DevelopmentProjectResponseDto[];

  @ApiProperty({
    type: PaginationMetaDto,
  })
  meta!: PaginationMetaDto;
}
