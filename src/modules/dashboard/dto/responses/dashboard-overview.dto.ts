import { ApiProperty } from '@nestjs/swagger';

export class DashboardMetricDto {
  @ApiProperty({
    example: 245680,
    description: 'Current value.',
  })
  total!: number;

  @ApiProperty({
    example: 18.5,
    description: 'Percentage change compared to the previous period.',
  })
  growth!: number;

  @ApiProperty({
    example: 'increase',
    enum: ['increase', 'decrease', 'neutral'],
    description: 'Growth trend.',
  })
  trend!: 'increase' | 'decrease' | 'neutral';
}

export class DashboardCountMetricDto {
  @ApiProperty({
    example: 245,
    description: 'Current count.',
  })
  total!: number;

  @ApiProperty({
    example: 8.2,
    description: 'Percentage change compared to the previous period.',
  })
  growth!: number;

  @ApiProperty({
    example: 'increase',
    enum: ['increase', 'decrease', 'neutral'],
    description: 'Growth trend.',
  })
  trend!: 'increase' | 'decrease' | 'neutral';
}

export class DashboardOverviewDto {
  @ApiProperty({
    type: DashboardMetricDto,
  })
  donations!: DashboardMetricDto;

  @ApiProperty({
    type: DashboardMetricDto,
  })
  expenses!: DashboardMetricDto;

  @ApiProperty({
    type: DashboardMetricDto,
  })
  balance!: DashboardMetricDto;

  @ApiProperty({
    type: DashboardCountMetricDto,
  })
  families!: DashboardCountMetricDto;
}
