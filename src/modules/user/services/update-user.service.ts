import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { hashPassword } from '@/common/utils/hash';
import { UpdateUserDto } from '../dto/requests/update-user.dto';
import { UserResponseDto } from '../dto/responses/user-response.dto';
import { UserRole } from '@/lib/prisma/client';

@Injectable()
export class UpdateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    // 1. Check if the user exists with role included to check if target is SUPER_ADMIN
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    // 3. Check for unique conflicts if email or phone is being updated
    if (dto.email || dto.phone) {
      const duplicateUser = await this.prisma.user.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            {
              OR: [
                ...(dto.email ? [{ email: dto.email }] : []),
                ...(dto.phone ? [{ phone: dto.phone }] : []),
              ],
            },
          ],
        },
      });

      if (duplicateUser) {
        if (dto.email && duplicateUser.email === dto.email) {
          throw new ConflictException('User with this email already exists.');
        }
        if (dto.phone && duplicateUser.phone === dto.phone) {
          throw new ConflictException(
            'User with this phone number already exists.',
          );
        }
      }
    }

    // 4. Handle Role update if role name is provided
    let roleId: string | undefined = undefined;
    if (dto.role) {
      // Prevent someone from assigning SUPER_ADMIN role via normal update if needed
      if (dto.role === UserRole.SUPER_ADMIN) {
        throw new ForbiddenException('Cannot assign Super Admin role.');
      }

      const roleRecord = await this.prisma.role.findUnique({
        where: { name: dto.role },
      });

      if (!roleRecord) {
        throw new NotFoundException(`Role '${dto.role}' does not exist.`);
      }
      roleId = roleRecord.id;
    }

    // 5. Hash password using custom utility if it's being updated
    let hashedPassword: string | undefined = undefined;
    if (dto.password) {
      hashedPassword = await hashPassword(dto.password, 10);
    }

    // 6. Block email and phone updates if the user is SUPER_ADMIN
    if (existingUser.role.name === UserRole.SUPER_ADMIN) {
      if (dto.email && dto.email !== existingUser.email) {
        throw new ForbiddenException('Cannot change email of a Super Admin.');
      }
    }

    // 6. Update the user
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        ...(hashedPassword && { password: hashedPassword }),
        ...(roleId && { roleId }),
        ...(dto.status && { status: dto.status }),
        ...(dto.avatarId !== undefined && { avatarId: dto.avatarId }),
      },
      include: {
        role: true,
        avatar: true,
      },
    });

    // 7. Return response DTO mapping
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role.name,
      status: updatedUser.status,
      avatar: updatedUser.avatar
        ? {
            id: updatedUser.avatar.id,
            url: updatedUser.avatar.url,
          }
        : null,
      lastLoginAt: updatedUser.lastLoginAt,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  }
}
