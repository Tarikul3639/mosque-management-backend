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

class GalleryImageDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  url!: string;
}

export class GalleryResponseDto {
  @ApiProperty()
  id!: string;

  @ApiPropertyOptional()
  title!: string | null;

  @ApiProperty({
    type: [GalleryImageDto],
  })
  images!: GalleryImageDto[];

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