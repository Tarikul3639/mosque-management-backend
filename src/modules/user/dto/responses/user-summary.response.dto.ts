import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from '@/lib/prisma/client';

export class RoleCountDto {
  @ApiProperty({ enum: UserRole, example: UserRole.ADMIN })
  role!: UserRole;

  @ApiProperty({ example: 5 })
  count!: number;
}

export class StatusCountDto {
  @ApiProperty({ enum: UserStatus, example: UserStatus.ACTIVE })
  status!: UserStatus;

  @ApiProperty({ example: 45 })
  count!: number;
}

export class UserSummaryResponseDto {
  @ApiProperty({ description: 'Total users count', example: 50 })
  totalUsers!: number;

  @ApiProperty({
    description: 'Breakdown of users by status',
    type: [StatusCountDto],
  })
  statusBreakdown!: StatusCountDto[];

  @ApiProperty({
    description: 'Breakdown of users by role',
    type: [RoleCountDto],
  })
  roleBreakdown!: RoleCountDto[];
}
