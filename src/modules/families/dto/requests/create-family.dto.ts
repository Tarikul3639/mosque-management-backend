import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

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