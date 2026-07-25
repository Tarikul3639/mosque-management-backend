import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

class DonorAvatarDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  url!: string;
}

export class DonorResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  phone!: string;

  @ApiPropertyOptional({
    nullable: true,
  })
  email!: string | null;

  @ApiPropertyOptional({
    type: DonorAvatarDto,
    nullable: true,
  })
  avatar!: DonorAvatarDto | null;

  @ApiPropertyOptional({
    nullable: true,
  })
  address!: string | null;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}