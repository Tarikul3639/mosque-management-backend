import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FileResponseDto {
  @ApiProperty({
    example: '8d6b0a88-0f7d-4f4f-a9bb-0c5f4b7b4d61',
    description: 'Unique file identifier.',
  })
  id!: string;

  @ApiProperty({
    example: 'families/iyppoqmvw32lk2dc6sia',
    description: 'Cloudinary public ID.',
  })
  publicId!: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/classflow-prime/image/upload/v1785260035/families/iyppoqmvw32lk2dc6sia.jpg',
    description: 'Public URL of the uploaded file.',
  })
  url!: string;

  @ApiPropertyOptional({
    example: 'avatar',
    description: 'Original filename.',
  })
  originalName?: string;

  @ApiPropertyOptional({
    example: 'image/jpeg',
    description: 'MIME type.',
  })
  mimeType?: string;

  @ApiPropertyOptional({
    example: 'jpg',
    description: 'File format.',
  })
  format?: string;

  @ApiProperty({
    example: 6110,
    description: 'File size in bytes.',
  })
  size!: number;

  @ApiPropertyOptional({
    example: 171,
    description: 'Image width.',
  })
  width?: number;

  @ApiPropertyOptional({
    example: 171,
    description: 'Image height.',
  })
  height?: number;

  @ApiProperty({
    example: '2026-07-28T17:33:55.000Z',
    description: 'Creation timestamp.',
  })
  createdAt!: Date;
}
