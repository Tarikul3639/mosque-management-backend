import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { FileService } from '@/common/file/file.service';

import { COMMITTEE_MESSAGES } from '../constants/committee.constants';
import { UpdateCommitteeMemberDto } from '../dto/requests/update-committee-member.dto';
import { CommitteeMemberResponseDto } from '../dto/responses/committee-member-response.dto';
import { CommitteeMemberMapper } from '../mappers/committee-member.mapper';

@Injectable()
export class UpdateCommitteeMemberService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async execute(
    id: string,
    dto: UpdateCommitteeMemberDto,
  ): Promise<CommitteeMemberResponseDto> {
    const member = await this.prisma.committeeMember.findUnique({
      where: {
        id,
      },
    });

    if (!member) {
      throw new NotFoundException(COMMITTEE_MESSAGES.NOT_FOUND);
    }

    if (dto.phone && dto.phone !== member.phone) {
      const existingPhone = await this.prisma.committeeMember.findFirst({
        where: {
          phone: dto.phone,
          NOT: {
            id,
          },
        },
      });

      if (existingPhone) {
        throw new ConflictException(COMMITTEE_MESSAGES.PHONE_ALREADY_EXISTS);
      }
    }

    if (dto.email && dto.email !== member.email) {
      const existingEmail = await this.prisma.committeeMember.findFirst({
        where: {
          email: dto.email,
          NOT: {
            id,
          },
        },
      });

      if (existingEmail) {
        throw new ConflictException(COMMITTEE_MESSAGES.EMAIL_ALREADY_EXISTS);
      }
    }

    const updatedMember = await this.prisma.committeeMember.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        designation: dto.designation,
        phone: dto.phone,
        email: dto.email,
        address: dto.address,

        joiningDate: dto.joiningDate ? new Date(dto.joiningDate) : undefined,

        endDate: dto.endDate ? new Date(dto.endDate) : undefined,

        isActive: dto.isActive,

        ...(dto.avatarId !== undefined && {
          avatar: dto.avatarId
            ? {
                connect: {
                  id: dto.avatarId,
                },
              }
            : {
                disconnect: true,
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

    await this.fileService.replace(member.avatarId, dto.avatarId);

    return CommitteeMemberMapper.toResponse(updatedMember);
  }
}
