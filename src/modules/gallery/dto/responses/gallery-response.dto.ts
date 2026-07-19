import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

class GalleryUserDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  fullName!: string;
}

export class GalleryResponseDto {
  @ApiProperty()
  id!: string;

  @ApiPropertyOptional()
  title!: string | null;

  @ApiProperty()
  imageUrl!: string;

  @ApiPropertyOptional()
  description!: string | null;

  @ApiProperty()
  order!: number;

  @ApiProperty({
    type: GalleryUserDto,
    nullable: true,
  })
  createdBy!: GalleryUserDto | null;

  @ApiProperty({
    type: GalleryUserDto,
    nullable: true,
  })
  updatedBy!: GalleryUserDto | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}