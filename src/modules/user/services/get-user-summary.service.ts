import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { UserSummaryResponseDto } from '../dto/responses/user-summary.response.dto';

@Injectable()
export class GetUserSummaryService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<UserSummaryResponseDto> {
    // 1. Get total users count
    const totalUsers = await this.prisma.user.count();

    // 2. Get status breakdown (ACTIVE vs INACTIVE)
    const statusGroups = await this.prisma.user.groupBy({
      by: ['status'],
      _count: {
        _all: true,
      },
    });

    const statusBreakdown = statusGroups.map((group) => ({
      status: group.status,
      count: group._count._all,
    }));

    // 3. Get role breakdown by joining with roles table or grouping via roleId
    // Since role name is in the Role model, we can query roles with user counts or aggregate
    const roles = await this.prisma.role.findMany({
      include: {
        _count: {
          select: { users: true },
        },
      },
    });

    const roleBreakdown = roles.map((role) => ({
      role: role.name,
      count: role._count.users,
    }));

    return {
      totalUsers,
      statusBreakdown,
      roleBreakdown,
    };
  }
}
