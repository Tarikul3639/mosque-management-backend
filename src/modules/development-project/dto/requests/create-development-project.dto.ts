import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MaxLength,
    Max,
    Min,
} from 'class-validator';

import { ProjectStatus } from '@/lib/prisma/client';

export class CreateDevelopmentProjectDto {
    @ApiProperty({
        example: 'Mosque Expansion Project',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title!: string;

    @ApiPropertyOptional({
        example: 'Construction of the second floor.',
    })
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    description?: string;

    @ApiProperty({
        example: 500000,
    })
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    budget!: number;

    @ApiPropertyOptional({
        example: 0,
    })
    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    spent?: number;

    @ApiProperty({
        enum: ProjectStatus,
        example: ProjectStatus.PLANNING,
    })
    @IsEnum(ProjectStatus)
    status!: ProjectStatus;

    @ApiPropertyOptional({
        example: 'https://example.com/project.jpg',
    })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiProperty()
    @IsDateString()
    startDate!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    endDate?: string;

    @ApiPropertyOptional({
        example: 25,
        description: 'Project progress percentage (0-100)',
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    progress?: number;
}