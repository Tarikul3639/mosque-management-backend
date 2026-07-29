import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsEmail,
  IsOptional,
  IsBoolean,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateDonorDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsPhoneNumber('BD')
  phone!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  avatarId?: string;

  @ApiProperty()
  @IsBoolean()
  isActive!: boolean;
}