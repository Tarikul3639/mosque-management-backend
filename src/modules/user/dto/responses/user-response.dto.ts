import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole, UserStatus } from '@/lib/prisma/client';

class AvatarResponseDto {
  @ApiProperty({
    description: 'Avatar File ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Avatar URL',
    example: 'https://example.com/avatar.jpg',
  })
  url!: string;
}

export class UserResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the user (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'Abdur Rahman',
  })
  name!: string;

  @ApiProperty({
    description: 'Email address',
    example: 'admin@mosque.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+8801712345678',
  })
  phone!: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.ADMIN,
  })
  role!: UserRole;

  @ApiProperty({
    enum: UserStatus,
    example: UserStatus.ACTIVE,
  })
  status!: UserStatus;

  @ApiPropertyOptional({
    description: 'Avatar information',
    nullable: true,
  })
  avatar?: AvatarResponseDto | null;

  @ApiPropertyOptional({
    description: 'Last login timestamp',
    example: '2026-06-06T07:58:46.000Z',
    nullable: true,
  })
  lastLoginAt?: Date | null;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2026-06-06T07:58:46.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2026-06-06T07:58:46.000Z',
  })
  updatedAt!: Date;
}
