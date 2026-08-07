import { IsOptional, IsString, MinLength } from 'class-validator';

export class GlobalSearchQueryDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  q?: string;
}