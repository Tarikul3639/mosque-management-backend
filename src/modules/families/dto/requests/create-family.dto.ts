import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateFamilyDto {
  @ApiProperty({
    example: 'FAM-0001',
    description: 'Unique family number',
  })
  @IsString()
  @Length(1, 50)
  familyNo!: string;

  @ApiProperty({
    example: 'Abdul Karim',
    description: 'Head of the family',
  })
  @IsString()
  @Length(2, 100)
  headName!: string;

  @ApiPropertyOptional({
    example: '01712345678',
    description: 'Family contact number',
  })
  @IsOptional()
  @IsPhoneNumber('BD')
  phone?: string;

  @ApiPropertyOptional({
    example: '6b8b0d0b-0b7d-4d16-91c8-9b1d1d2e3f4a',
    description: 'Avatar File ID',
  })
  @IsOptional()
  @IsUUID()
  avatarId?: string;

  @ApiPropertyOptional({
    example: 'Village: Rathura, Kaliganj, Gazipur',
    description: 'Family address',
  })
  @IsOptional()
  @IsString()
  @Length(2, 255)
  address?: string;

  @ApiPropertyOptional({
    example: true,
    default: true,
    description: 'Family active status',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}