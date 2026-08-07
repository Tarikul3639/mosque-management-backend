import { IsOptional, IsString, MinLength } from 'class-validator';

export class SearchQueryDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  q?: string;
}
