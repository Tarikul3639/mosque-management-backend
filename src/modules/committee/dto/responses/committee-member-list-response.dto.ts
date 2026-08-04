import { ApiProperty } from '@nestjs/swagger';
import { CommitteeMemberResponseDto } from './committee-member-response.dto';

export class CommitteeMemberListResponseDto {
  @ApiProperty({
    type: [CommitteeMemberResponseDto],
  })
  data!: CommitteeMemberResponseDto[];

  @ApiProperty({
    example: 25,
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
    example: 3,
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
