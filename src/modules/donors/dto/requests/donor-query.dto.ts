import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsBooleanString,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { Type } from 'class-transformer';

export class DonorQueryDto {
  @ApiPropertyOptional({
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page = 1;

  @ApiPropertyOptional({
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit = 10;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  isActive?: string;
}
