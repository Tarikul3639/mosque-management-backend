import { ApiProperty } from '@nestjs/swagger';

import { CommitteeMemberResponseDto } from './committee-member-response.dto';
import { CommitteeSummaryResponseDto } from './committee-summary-response.dto';
import { MetaData } from '@/common/interfaces/meta-data.interface';

export class CommitteeMemberListResponseDto {
  @ApiProperty({
    type: [CommitteeMemberResponseDto],
  })
  data!: CommitteeMemberResponseDto[];

  @ApiProperty({
    type: CommitteeSummaryResponseDto,
  })
  summary!: CommitteeSummaryResponseDto;

  @ApiProperty({
    type: MetaData,
  })
  meta!: MetaData;
}
