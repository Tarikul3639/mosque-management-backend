import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class FamilyAvatarDto {
  @ApiProperty({
    example: 'cmf8x8x8x0001abcd1234',
  })
  id!: string;

  @ApiProperty({
    example: 'https://example.com/uploads/families/avatar.jpg',
  })
  url!: string;
}

export class FamilyResponseDto {
  @ApiProperty({
    example: 'cmf8x8x8x0001abcd1234',
  })
  id!: string;

  @ApiProperty({
    example: 'FAM-0001',
  })
  familyNo!: string;

  @ApiProperty({
    example: 'Abdul Karim',
  })
  headName!: string;

  @ApiPropertyOptional({
    example: '01712345678',
    nullable: true,
  })
  phone!: string | null;

  @ApiPropertyOptional({
    example: 'Village: Rathura, Kaliganj, Gazipur',
    nullable: true,
  })
  address!: string | null;

  @ApiPropertyOptional({
    type: FamilyAvatarDto,
    nullable: true,
  })
  avatar!: FamilyAvatarDto | null;

  @ApiProperty({
    example: true,
  })
  isActive!: boolean;

  @ApiProperty({
    example: '2026-07-18T10:30:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-07-18T10:30:00.000Z',
  })
  updatedAt!: Date;
}