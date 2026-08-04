import { ApiProperty } from '@nestjs/swagger';

export class CommitteeSummaryResponseDto {
  @ApiProperty({
    example: 15,
    description: 'Total committee members',
  })
  totalMembers!: number;

  @ApiProperty({
    example: 12,
    description: 'Currently active members',
  })
  activeMembers!: number;

  @ApiProperty({
    example: 3,
    description: 'Inactive members',
  })
  inactiveMembers!: number;

  @ApiProperty({
    example: 1,
    description: 'Number of presidents',
  })
  presidents!: number;

  @ApiProperty({
    example: 1,
    description: 'Number of vice presidents',
  })
  vicePresidents!: number;

  @ApiProperty({
    example: 1,
    description: 'Number of secretaries',
  })
  secretaries!: number;

  @ApiProperty({
    example: 1,
    description: 'Number of assistant secretaries',
  })
  assistantSecretaries!: number;

  @ApiProperty({
    example: 1,
    description: 'Number of treasurers',
  })
  treasurers!: number;

  @ApiProperty({
    example: 2,
    description: 'Number of assistant treasurers',
  })
  imams!: number;

  @ApiProperty({
    example: 2,
    description: 'Number of assistant imams',
  })
  muazzins!: number;

  @ApiProperty({
    example: 6,
    description: 'Total number of members',
  })
  members!: number;
}
