import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseDto {
  @ApiProperty({
    example: 'https://res.cloudinary.com/demo/image/upload/v1234567890/families/avatar.jpg',
    description: 'Public URL of the uploaded image',
  })
  url!: string;

  @ApiProperty({
    example: 'families/avatar_abcd1234',
    description: 'Cloudinary public identifier',
  })
  publicId!: string;

  @ApiProperty({
    example: 512,
    description: 'Image width in pixels',
  })
  width!: number;

  @ApiProperty({
    example: 512,
    description: 'Image height in pixels',
  })
  height!: number;

  @ApiProperty({
    example: 'jpg',
    description: 'Image format',
  })
  format!: string;

  @ApiProperty({
    example: 84562,
    description: 'Image size in bytes',
  })
  bytes!: number;

  @ApiProperty({
    example: 'avatar.jpg',
    description: 'Original uploaded filename',
  })
  originalFilename!: string;
}