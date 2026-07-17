import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({
    example: '01712345678',
    required: false,
    nullable: true,
  })
  phone?: string | null;

  @ApiProperty({
    example: 'Village: Rathura, Kaliganj, Gazipur',
    required: false,
    nullable: true,
  })
  address?: string | null;

  @ApiProperty({
    example: 'https://example.com/uploads/families/avatar.jpg',
    required: false,
    nullable: true,
  })
  avatar?: string | null;

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