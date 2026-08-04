import { Injectable } from '@nestjs/common';

import { Prisma } from '@/lib/prisma/client';
import { PrismaService } from '@/common/prisma/prisma.service';

import { CommitteeMemberQueryDto } from '../dto/requests/committee-member-query.dto';
import { CommitteeMemberListResponseDto } from '../dto/responses/committee-member-list-response.dto';
import { CommitteeMemberMapper } from '../mappers/committee-member.mapper';

import {
  COMMITTEE_DEFAULT_LIMIT,
  COMMITTEE_DEFAULT_PAGE,
  COMMITTEE_SEARCH_FIELDS,
} from '../constants/committee.constants';

@Injectable()
export class ListCommitteeMembersService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    query: CommitteeMemberQueryDto,
  ): Promise<CommitteeMemberListResponseDto> {
    const page = query.page ?? COMMITTEE_DEFAULT_PAGE;

    const limit = query.limit ?? COMMITTEE_DEFAULT_LIMIT;

    const skip = (page - 1) * limit;

    const where: Prisma.CommitteeMemberWhereInput = {};

    if (query.search) {
      where.OR = COMMITTEE_SEARCH_FIELDS.map((field) => ({
        [field]: {
          contains: query.search,
          mode: 'insensitive',
        },
      })) as Prisma.CommitteeMemberWhereInput[];
    }

    if (query.designation) {
      where.designation = query.designation;
    }

    if (query.isActive !== undefined) {
      where.isActive = query.isActive;
    }

    const [
      members,
      total,

      totalMembers,
      activeMembers,
      inactiveMembers,

      designationCounts,
    ] = await Promise.all([
      this.prisma.committeeMember.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          avatar: {
            select: {
              id: true,
              url: true,
            },
          },
        },
      }),

      this.prisma.committeeMember.count({
        where,
      }),

      this.prisma.committeeMember.count(),

      this.prisma.committeeMember.count({
        where: {
          isActive: true,
        },
      }),

      this.prisma.committeeMember.count({
        where: {
          isActive: false,
        },
      }),

      this.prisma.committeeMember.groupBy({
        by: ['designation'],

        _count: {
          designation: true,
        },
      }),
    ]);

    const designationMap = Object.fromEntries(
      designationCounts.map((item) => [
        item.designation,
        item._count.designation,
      ]),
    );

    const totalPages = Math.ceil(total / limit);

    return {
      data: CommitteeMemberMapper.toResponseList(members),

      summary: {
        totalMembers,
        activeMembers,
        inactiveMembers,

        presidents: designationMap['PRESIDENT'] ?? 0,

        vicePresidents: designationMap['VICE_PRESIDENT'] ?? 0,

        secretaries: designationMap['SECRETARY'] ?? 0,

        assistantSecretaries: designationMap['ASSISTANT_SECRETARY'] ?? 0,

        treasurers: designationMap['TREASURER'] ?? 0,

        imams: designationMap['IMAM'] ?? 0,

        muazzins: designationMap['MUAZZIN'] ?? 0,

        members: designationMap['MEMBER'] ?? 0,
      },

      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}
