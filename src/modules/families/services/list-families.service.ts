import { Injectable } from '@nestjs/common';

import { Prisma } from '@/lib/prisma/client';
import { PrismaService } from '@/common/prisma/prisma.service';

import {
  FAMILY_DEFAULT_LIMIT,
  FAMILY_DEFAULT_PAGE,
} from '../constants/family.constants';

import { FamilyQueryDto } from '../dto/requests/family-query.dto';
import { FamilyListResponseDto } from '../dto/responses/family-list-response.dto';

@Injectable()
export class ListFamiliesService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async execute(
    query: FamilyQueryDto,
  ): Promise<FamilyListResponseDto> {
    const page = query.page ?? FAMILY_DEFAULT_PAGE;
    const limit = query.limit ?? FAMILY_DEFAULT_LIMIT;

    const skip = (page - 1) * limit;

    const where: Prisma.FamilyWhereInput = {};

    if (query.search) {
      where.OR = [
        {
          familyNo: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          headName: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          phone: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          address: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (query.isActive !== undefined) {
      where.isActive = query.isActive;
    }

    const [families, total] = await this.prismaService.$transaction([
      this.prismaService.family.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [query.sortBy ?? 'createdAt']:
            query.sortOrder ?? 'desc',
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

      this.prismaService.family.count({
        where,
      }),
    ]);

    return {
      data: families.map((family) => ({
        id: family.id,
        familyNo: family.familyNo,
        headName: family.headName,
        phone: family.phone,
        address: family.address,
        avatar: family.avatar,
        isActive: family.isActive,
        createdAt: family.createdAt,
        updatedAt: family.updatedAt,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}