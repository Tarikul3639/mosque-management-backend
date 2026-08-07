import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { UserResponseDto } from '../dto/responses/user-response.dto';
import { UserListResponseDto } from '../dto/responses/user-list-response.dto';
import { UserStatus, UserRole } from '@/lib/prisma/client';
import { GetUsersQueryDto } from '../dto/requests/get-users-query.dto';

@Injectable()
export class GetUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetUsersQueryDto): Promise<UserListResponseDto> {
    const page = query.page && query.page > 0 ? Number(query.page) : 1;
    const limit = query.limit && query.limit > 0 ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = {};

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
        { phone: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.role) {
      where.role = {
        name: query.role,
      };
    }

    // Fetch total count and paginated users concurrently
    const [total, users] = await Promise.all([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: {
          role: true, // Included to access role.name (UserRole enum)
          avatar: true, // Include avatar relation to get avatar URL
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    // Map users to UserResponseDto format
    const data: UserResponseDto[] = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role.name,
      status: user.status,
      avatar: user.avatar
        ? {
            id: user.avatar.id,
            url: user.avatar.url,
          }
        : null,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}
