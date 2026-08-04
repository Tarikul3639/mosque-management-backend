// src/modules/uploads/dto/requests/create-file.dto.ts

import { IsInt, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({
    example: 'families/iyppoqmvw32lk2dc6sia',
    description: 'Cloudinary public ID.',
  })
  @IsString()
  publicId!: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/demo/image/upload/v1234567890/families/avatar.jpg',
    description: 'Secure Cloudinary URL.',
  })
  @IsUrl()
  url!: string;

  @ApiPropertyOptional({
    example: 'avatar',
    description: 'Original uploaded file name.',
  })
  @IsOptional()
  @IsString()
  originalName?: string;

  @ApiPropertyOptional({
    example: 'image/jpeg',
    description: 'Uploaded file MIME type.',
  })
  @IsOptional()
  @IsString()
  mimeType?: string;

  @ApiPropertyOptional({
    example: 'jpg',
    description: 'File format or extension.',
  })
  @IsOptional()
  @IsString()
  format?: string;

  @ApiProperty({
    example: 6110,
    description: 'File size in bytes.',
  })
  @IsInt()
  @Min(1)
  size!: number;

  @ApiPropertyOptional({
    example: 171,
    description: 'Image width in pixels.',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50000)
  width?: number;

  @ApiPropertyOptional({
    example: 171,
    description: 'Image height in pixels.',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50000)
  height?: number;
}
