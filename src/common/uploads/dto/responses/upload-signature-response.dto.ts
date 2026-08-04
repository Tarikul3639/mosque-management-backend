// src/modules/uploads/dto/responses/upload-signature-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class UploadSignatureResponseDto {
  @ApiProperty({
    example: '1733073200',
    description: 'Unix timestamp used to generate the signature',
  })
  timestamp!: number;

  @ApiProperty({
    example: '3d6d6d6a7d3d6d6d...',
    description: 'Cloudinary upload signature',
  })
  signature!: string;

  @ApiProperty({
    example: 'families',
    description: 'Target Cloudinary folder',
  })
  folder!: string;

  @ApiProperty({
    example: '123456789012345',
    description: 'Cloudinary API key',
  })
  apiKey!: string;

  @ApiProperty({
    example: 'my-cloud',
    description: 'Cloudinary cloud name',
  })
  cloudName!: string;
}
