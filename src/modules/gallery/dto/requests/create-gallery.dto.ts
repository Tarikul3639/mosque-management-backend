import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateGalleryDto {
  @ApiPropertyOptional({
    example: 'Eid Prayer 2026',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @ApiProperty({
    type: [String],
    description: 'Uploaded image file IDs',
    example: [
      '3d4eeb9d-3e7d-4b40-bb66-c36fef0f87d2',
      '8dbdc8fd-c1db-4a73-8cf6-7e1d7c8b34b5',
    ],
  })
  @IsArray()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  imageIds!: string[];

  @ApiPropertyOptional({
    example: 'Photos from Eid-ul-Adha prayer.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({
    example: 1,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}