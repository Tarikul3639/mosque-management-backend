import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../common/prisma/prisma.service';
import { hashPassword } from '../../../common/utils/hash';
import { CreateUserDto } from '../dto/requests/create-user.dto';
import { UserResponseDto } from '../dto/responses/user-response.dto';

@Injectable()
export class CreateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(dto: CreateUserDto): Promise<UserResponseDto> {
    // 1. Check if email or phone already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { phone: dto.phone }],
      },
    });

    if (existingUser) {
      if (existingUser.email === dto.email) {
        throw new ConflictException('User with this email already exists.');
      }
      if (existingUser.phone === dto.phone) {
        throw new ConflictException(
          'User with this phone number already exists.',
        );
      }
    }

    // 2. Find the Role ID from the roles table using the role name (enum)
    const roleRecord = await this.prisma.role.findUnique({
      where: { name: dto.role },
    });

    if (!roleRecord) {
      throw new NotFoundException(
        `Role '${dto.role}' does not exist in the system.`,
      );
    }

    // 3. Hash the password securely using custom utility (saltRounds: 10)
    const hashedPassword = await hashPassword(dto.password, 10);

    // 4. Create the user with the relation to Role
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        password: hashedPassword,
        roleId: roleRecord.id,
        avatarId: dto.avatarId,
      },
      include: {
        role: true,
        avatar: true, // Include avatar relation for the response DTO
      },
    });

    // 5. Return the response DTO mapping
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role.name,
      status: user.status,
      avatar: user.avatar
        ? {
            id: user.avatar.id,
            url: user.avatar.url,
          }
        : null,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
