import { PartialType } from '@nestjs/mapped-types';
import { CreateCommitteeMemberDto } from "../requests/create-committee-member.dto";

export class UpdateCommitteeMemberDto extends PartialType(
    CreateCommitteeMemberDto,
) { }