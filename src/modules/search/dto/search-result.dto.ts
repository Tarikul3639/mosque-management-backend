// src/modules/search/dto/search-result.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum SearchResultType {
  USER = 'USER',
  FAMILY = 'FAMILY',
  DONOR = 'DONOR',
  COMMITTEE = 'COMMITTEE',
  PROJECT = 'PROJECT',
  DONATION = 'DONATION',
  EXPENSE = 'EXPENSE',
  PAYMENT = 'PAYMENT',
  GALLERY = 'GALLERY',
}

export class SearchResultDto {
  @ApiProperty({
    description: 'Unique identifier for the search result entity',
    example: '507f1f77bcf86cd799439011',
  })
  id!: string;

  @ApiProperty({
    description: 'Type of entity returned in the search result',
    enum: SearchResultType,
    example: SearchResultType.USER,
  })
  type!: SearchResultType;

  @ApiProperty({
    description: 'Primary title or label of the search result',
    example: 'John Doe',
  })
  title!: string;

  @ApiPropertyOptional({
    description: 'Optional secondary text providing extra details or context',
    example: 'Software Engineer • Active Member',
  })
  subtitle?: string;

  @ApiProperty({
    description: 'Relative navigation route for frontend redirection',
    example: '/dashboard/users/507f1f77bcf86cd799439011',
  })
  url!: string;
}
