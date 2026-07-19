import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { CommitteeRole } from '@/lib/prisma/client';

export class CreateCommitteeMemberDto {
  @ApiProperty({
    example: 'Md. Abdul Karim',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName!: string;

  @ApiProperty({
    enum: CommitteeRole,
    example: CommitteeRole.PRESIDENT,
  })
  @IsEnum(CommitteeRole)
  designation!: CommitteeRole;

  @ApiProperty({
    example: '01712345678',
  })
  @IsPhoneNumber('BD')
  phone!: string;

  @ApiPropertyOptional({
    example: 'karim@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: '6b8b0d0b-0b7d-4d16-91c8-9b1d1d2e3f4a',
    description: 'Uploaded File ID',
  })
  @IsOptional()
  @IsUUID()
  avatarId?: string;

  @ApiPropertyOptional({
    example: 'Dhaka, Bangladesh',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @ApiPropertyOptional({
    example: '2026-01-01',
  })
  @IsOptional()
  @IsDateString()
  joiningDate?: string;

  @ApiPropertyOptional({
    example: '2028-12-31',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}