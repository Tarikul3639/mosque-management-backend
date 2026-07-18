import { PartialType } from '@nestjs/mapped-types';
import { CommitteeMemberResponseDto } from "../responses/committee-member-response.dto";

export class UpdateCommitteeMemberDto extends PartialType(
    CommitteeMemberResponseDto,
) { }