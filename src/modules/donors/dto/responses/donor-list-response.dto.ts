import { ApiProperty } from '@nestjs/swagger';
import { DonorResponseDto } from './donor-response.dto';

export class DonorListResponseDto {
  @ApiProperty({
    type: [DonorResponseDto],
  })
  data!: DonorResponseDto[];

  @ApiProperty()
  total!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;

  @ApiProperty()
  totalPages!: number;
}
