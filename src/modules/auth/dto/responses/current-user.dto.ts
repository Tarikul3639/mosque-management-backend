import { ApiProperty } from '@nestjs/swagger';

import { UserRole } from '@/lib/prisma/client';

export class CurrentUserDto {
    @ApiProperty()
    id!: string;

    @ApiProperty()
    fullName!: string;

    @ApiProperty()
    email!: string;

    @ApiProperty()
    phone!: string;

    @ApiProperty({
        nullable: true,
    })
    avatar!: string | null;

    @ApiProperty({
        enum: UserRole,
    })
    role!: UserRole;
}