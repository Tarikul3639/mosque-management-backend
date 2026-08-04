import { ApiProperty } from '@nestjs/swagger';
import { ProjectResponseDto } from './project-response.dto';

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

export class ProjectListResponseDto {
  @ApiProperty({
    type: [ProjectResponseDto],
  })
  data!: ProjectResponseDto[];

  @ApiProperty({
    type: PaginationMetaDto,
  })
  meta!: PaginationMetaDto;
}
