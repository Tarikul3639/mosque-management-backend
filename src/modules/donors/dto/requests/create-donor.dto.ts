import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateDonorDto {
  @ApiProperty()
  @IsString()
  fullName!: string;

  @ApiProperty()
  @IsPhoneNumber('BD')
  phone!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address!: string;
}