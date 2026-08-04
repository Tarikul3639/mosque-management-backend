import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { COMMITTEE_MESSAGES } from '../constants/committee.constants';
import { CreateCommitteeMemberDto } from '../dto/requests/create-committee-member.dto';
import { CommitteeMemberResponseDto } from '../dto/responses/committee-member-response.dto';
import { CommitteeMemberMapper } from '../mappers/committee-member.mapper';

@Injectable()
export class CreateCommitteeMemberService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    dto: CreateCommitteeMemberDto,
  ): Promise<CommitteeMemberResponseDto> {
    const existingPhone = await this.prismaService.committeeMember.findFirst({
      where: {
        phone: dto.phone,
      },
    });

    if (existingPhone) {
      throw new ConflictException(COMMITTEE_MESSAGES.PHONE_ALREADY_EXISTS);
    }

    if (dto.email) {
      const existingEmail = await this.prismaService.committeeMember.findFirst({
        where: {
          email: dto.email,
        },
      });

      if (existingEmail) {
        throw new ConflictException(COMMITTEE_MESSAGES.EMAIL_ALREADY_EXISTS);
      }
    }

    const member = await this.prismaService.committeeMember.create({
      data: {
        name: dto.name,
        designation: dto.designation,
        phone: dto.phone,
        email: dto.email,
        address: dto.address,
        joiningDate: dto.joiningDate ? new Date(dto.joiningDate) : null,
        endDate: dto.endDate ? new Date(dto.endDate) : null,
        isActive: dto.isActive ?? true,

        ...(dto.avatarId && {
          avatar: {
            connect: {
              id: dto.avatarId,
            },
          },
        }),
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

    return CommitteeMemberMapper.toResponse(member);
  }
}
