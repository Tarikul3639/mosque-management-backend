import { ApiProperty } from '@nestjs/swagger';

export class DevelopmentProjectSummaryResponseDto {
  @ApiProperty()
  totalProjects!: number;

  @ApiProperty()
  planningProjects!: number;

  @ApiProperty()
  runningProjects!: number;

  @ApiProperty()
  completedProjects!: number;

  @ApiProperty()
  cancelledProjects!: number;

  @ApiProperty()
  totalBudget!: string;

  @ApiProperty()
  totalSpent!: string;
}
