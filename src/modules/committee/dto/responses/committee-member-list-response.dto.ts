import { ApiProperty } from '@nestjs/swagger';

import { CommitteeMemberResponseDto } from './committee-member-response.dto';
import { CommitteeSummaryResponseDto } from './committee-summary-response.dto';
import { MetaDto } from '../../../../common/dto/meta.dto';

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
    type: MetaDto,
  })
  meta!: MetaDto;
}
