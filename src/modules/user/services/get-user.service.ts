import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { UserResponseDto } from '../dto/responses/user-response.dto';

@Injectable()
export class GetUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<UserResponseDto> {
    // 1. Find the user by ID and include the related Role model
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true, // Included to fetch role.name (UserRole enum)
        avatar: true, // Included to fetch avatar details (AvatarResponseDto)
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    // 2. Map and return the response DTO (excluding password)
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role.name, // Fetches the enum name from the role relation
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
