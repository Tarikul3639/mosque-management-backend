import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class DonorAvatarDto {
  @ApiProperty({
    description: 'Unique identifier of the avatar image.',
    example: 'clz9xj8q00001abcd1234efgh',
  })
  id!: string;

  @ApiProperty({
    description: 'Public URL of the avatar image.',
    example:
      'https://res.cloudinary.com/demo/image/upload/v1234567890/donors/avatar.jpg',
  })
  url!: string;
}

export class DonorResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the donor.',
    example: 'clz9xj8q00001abcd1234efgh',
  })
  id!: string;

  @ApiProperty({
    description: 'Full name of the donor.',
    example: 'Abdul Karim',
  })
  name!: string;

  @ApiProperty({
    description: 'Phone number of the donor.',
    example: '+8801712345678',
  })
  phone!: string;

  @ApiPropertyOptional({
    description: 'Email address of the donor.',
    example: 'abdul.karim@example.com',
    nullable: true,
  })
  email!: string | null;

  @ApiPropertyOptional({
    description: 'Avatar image information.',
    type: DonorAvatarDto,
    nullable: true,
  })
  avatar!: DonorAvatarDto | null;

  @ApiPropertyOptional({
    description: 'Residential address of the donor.',
    example: 'Mirpur, Dhaka, Bangladesh',
    nullable: true,
  })
  address!: string | null;

  @ApiProperty({
    description: 'Indicates whether the donor is active.',
    example: true,
  })
  isActive!: boolean;

  @ApiProperty({
    description: 'Date and time when the donor was created.',
    example: '2026-07-29T05:45:12.123Z',
    format: 'date-time',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Date and time when the donor was last updated.',
    example: '2026-07-29T06:10:45.456Z',
    format: 'date-time',
  })
  updatedAt!: Date;
}
