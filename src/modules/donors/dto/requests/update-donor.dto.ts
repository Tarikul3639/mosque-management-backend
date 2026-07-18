import {
    ApiPropertyOptional,
} from '@nestjs/swagger';

import {
    IsBoolean,
    IsEmail,
    IsOptional,
    IsString,
} from 'class-validator';

export class UpdateDonorDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    fullName!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    phone!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    email!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    address!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    avatar!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isActive!: boolean;
}