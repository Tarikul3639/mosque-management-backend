import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { ProjectStatus } from '@/lib/prisma/client';

export class CreateProjectDto {
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
    type: [String],
    description: 'Uploaded file IDs',
    example: [
      '3d4eeb9d-3e7d-4b40-bb66-c36fef0f87d2',
      '8dbdc8fd-c1db-4a73-8cf6-7e1d7c8b34b5',
    ],
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  imageIds?: string[];

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
