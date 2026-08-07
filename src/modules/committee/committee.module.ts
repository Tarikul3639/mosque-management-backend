import { Module } from '@nestjs/common';

import { PrismaModule } from '../../common/prisma/prisma.module';

import { CommitteeController } from './controllers/committee.controller';

import { CreateCommitteeMemberService } from './services/create-committee-member.service';
import { UpdateCommitteeMemberService } from './services/update-committee-member.service';
import { GetCommitteeMemberService } from './services/get-committee-member.service';
import { ListCommitteeMembersService } from './services/list-committee-members.service';
import { DeactivateCommitteeMemberService } from './services/deactivate-committee-member.service';
import { ActivateCommitteeMemberService } from './services/activate-committee-member.service';
import { ForceDeleteCommitteeMemberService } from './services/force-delete-committee-member.service';

@Module({
  imports: [PrismaModule],

  controllers: [CommitteeController],

  providers: [
    CreateCommitteeMemberService,
    UpdateCommitteeMemberService,
    GetCommitteeMemberService,
    ListCommitteeMembersService,
    DeactivateCommitteeMemberService,
    ActivateCommitteeMemberService,
    ForceDeleteCommitteeMemberService,
  ],

  exports: [
    CreateCommitteeMemberService,
    UpdateCommitteeMemberService,
    GetCommitteeMemberService,
    ListCommitteeMembersService,
    DeactivateCommitteeMemberService,
    ActivateCommitteeMemberService,
    ForceDeleteCommitteeMemberService,
  ],
})
export class CommitteeModule {}
