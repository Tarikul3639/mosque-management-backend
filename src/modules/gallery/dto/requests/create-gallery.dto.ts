import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
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
    example: 'https://example.com/gallery/image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  imageUrl!: string;

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