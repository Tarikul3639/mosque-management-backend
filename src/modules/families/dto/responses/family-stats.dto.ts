import { ApiProperty } from '@nestjs/swagger';

export class FamilyStatsDto {
  @ApiProperty({
    example: 125,
  })
  totalFamilies!: number;

  @ApiProperty({
    example: 110,
  })
  activeFamilies!: number;

  @ApiProperty({
    example: 15,
  })
  inactiveFamilies!: number;

  @ApiProperty({
    example: 8,
  })
  newFamiliesThisMonth!: number;
}
