import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../common/prisma/prisma.service';

import { COMMITTEE_MESSAGES } from '../constants/committee.constants';
import { CommitteeMemberMapper } from '../mappers/committee-member.mapper';
import { CommitteeMemberResponseDto } from '../dto/responses/committee-member-response.dto';

@Injectable()
export class GetCommitteeMemberService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<CommitteeMemberResponseDto> {
    const member = await this.prisma.committeeMember.findUnique({
      where: {
        id,
      },
      include: {
        avatar: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    if (!member) {
      throw new NotFoundException(COMMITTEE_MESSAGES.NOT_FOUND);
    }

    return CommitteeMemberMapper.toResponse(member);
  }
}
