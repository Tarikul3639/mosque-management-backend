import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { FileService } from '@/common/file/file.service';

import { FAMILY_MESSAGES } from '../constants/family.constants';
import { UpdateFamilyDto } from '../dto/requests/update-family.dto';
import { FamilyResponseDto } from '../dto/responses/family-response.dto';

@Injectable()
export class UpdateFamilyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async execute(id: string, dto: UpdateFamilyDto): Promise<FamilyResponseDto> {
    const family = await this.prisma.family.findUnique({
      where: {
        id,
      },
    });

    if (!family) {
      throw new NotFoundException(FAMILY_MESSAGES.NOT_FOUND);
    }

    if (dto.familyNo && dto.familyNo !== family.familyNo) {
      const existingFamily = await this.prisma.family.findUnique({
        where: {
          familyNo: dto.familyNo,
        },
      });

      if (existingFamily) {
        throw new ConflictException(FAMILY_MESSAGES.ALREADY_EXISTS);
      }
    }

    if (dto.phone && dto.phone !== family.phone) {
      const existingPhone = await this.prisma.family.findFirst({
        where: {
          phone: dto.phone,
          NOT: {
            id,
          },
        },
      });

      if (existingPhone) {
        throw new ConflictException(FAMILY_MESSAGES.PHONE_EXISTS);
      }
    }

    if (dto.email && dto.email !== family.email) {
      const existingEmail = await this.prisma.family.findFirst({
        where: {
          email: dto.email,
          NOT: {
            id,
          },
        },
      });

      if (existingEmail) {
        throw new ConflictException(FAMILY_MESSAGES.EMAIL_EXISTS);
      }
    }

    const updatedFamily = await this.prisma.family.update({
      where: {
        id,
      },
      data: {
        ...(dto.familyNo !== undefined && {
          familyNo: dto.familyNo,
        }),

        ...(dto.headName !== undefined && {
          headName: dto.headName,
        }),

        ...(dto.phone !== undefined && {
          phone: dto.phone,
        }),

        ...(dto.email !== undefined && {
          email: dto.email,
        }),

        ...(dto.address !== undefined && {
          address: dto.address,
        }),

        ...(dto.isActive !== undefined && {
          isActive: dto.isActive,
        }),

        ...(dto.avatarId !== undefined && {
          avatar: dto.avatarId
            ? {
                connect: {
                  id: dto.avatarId,
                },
              }
            : {
                disconnect: true,
              },
        }),
      },

      include: {
        avatar: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    await this.fileService.replace(family.avatarId, dto.avatarId);

    return {
      id: updatedFamily.id,
      familyNo: updatedFamily.familyNo,
      headName: updatedFamily.headName,
      phone: updatedFamily.phone,
      email: updatedFamily.email,
      address: updatedFamily.address,

      avatar: updatedFamily.avatar
        ? {
            id: updatedFamily.avatar.id,
            url: updatedFamily.avatar.url,
          }
        : null,

      isActive: updatedFamily.isActive,
      createdAt: updatedFamily.createdAt,
      updatedAt: updatedFamily.updatedAt,
    };
  }
}
