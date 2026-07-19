import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseDto {
  @ApiProperty()
  url!: string;

  @ApiProperty()
  publicId!: string;

  @ApiProperty()
  width!: number;

  @ApiProperty()
  height!: number;

  @ApiProperty()
  format!: string;

  @ApiProperty()
  bytes!: number;

  @ApiProperty()
  originalFilename!: string;
}