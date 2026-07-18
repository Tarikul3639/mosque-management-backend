import { ApiProperty } from '@nestjs/swagger';

export class DonorResponseDto {
    @ApiProperty()
    id!: string;

    @ApiProperty()
    fullName!: string;

    @ApiProperty()
    phone!: string;

    @ApiProperty({
        nullable: true,
    })
    email!: string | null;

    @ApiProperty({
        example: 'https://example.com/avatar.jpg',
        nullable: true,
    })
    avatar!: string | null;

    @ApiProperty({
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