import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { UserRole } from '@/lib/prisma/client';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Abdur Rahman',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    description: 'Email address',
    example: 'admin@mosque.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+8801712345678',
  })
  @IsPhoneNumber()
  phone!: string;

  @ApiProperty({
    description: 'Password',
    example: 'Admin@123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password!: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.ADMIN,
  })
  @IsEnum(UserRole)
  role!: UserRole;
}
