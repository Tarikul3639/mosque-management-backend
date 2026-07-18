import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommitteeRole } from '@/lib/prisma/client';

export class CommitteeMemberResponseDto {
  @ApiProperty({
    example: '6b8b0d0b-0b7d-4d16-91c8-9b1d1d2e3f4a',
  })
  id!: string;

  @ApiProperty({
    example: 'Md. Abdul Karim',
  })
  fullName!: string;

  @ApiProperty({
    enum: CommitteeRole,
    example: CommitteeRole.PRESIDENT,
  })
  designation!: CommitteeRole;

  @ApiProperty({
    example: '01712345678',
  })
  phone!: string;

  @ApiPropertyOptional({
    example: 'karim@example.com',
    nullable: true,
  })
  email!: string | null;

  @ApiPropertyOptional({
    example: 'https://example.com/photo.jpg',
    nullable: true,
  })
  avatar!: string | null;

  @ApiPropertyOptional({
    example: 'Dhaka, Bangladesh',
    nullable: true,
  })
  address!: string | null;

  @ApiPropertyOptional({
    example: '2026-01-01T00:00:00.000Z',
    nullable: true,
  })
  joiningDate!: Date | null;

  @ApiPropertyOptional({
    example: '2028-12-31T00:00:00.000Z',
    nullable: true,
  })
  endDate!: Date | null;

  @ApiProperty({
    example: true,
  })
  isActive!: boolean;

  @ApiProperty({
    example: '2026-07-19T10:00:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2026-07-19T10:00:00.000Z',
  })
  updatedAt!: Date;
}