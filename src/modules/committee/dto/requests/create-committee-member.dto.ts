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
    example: 'https://example.com/photo.jpg',
  })
  @IsOptional()
  @IsString()
  avatar?: string;

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