import { ApiProperty } from '@nestjs/swagger';

export class FamilyFeeResponseDto {
  @ApiProperty({
    example: 'cmf8x8x8x0000abcd1234',
  })
  id!: string;

  @ApiProperty({
    example: 'cmf8x8x8x0001abcd1234',
  })
  familyId!: string;

  @ApiProperty({
    example: 500,
  })
  monthlyFee!: number;

  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
  })
  startDate!: Date;

  @ApiProperty({
    example: '2026-12-31T00:00:00.000Z',
    nullable: true,
    required: false,
  })
  endDate?: Date | null;

  @ApiProperty({
    example: '2026-01-01T10:30:00.000Z',
  })
  createdAt!: Date;
}