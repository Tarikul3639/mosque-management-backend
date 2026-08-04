import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { FAMILY_MESSAGES } from '../constants/family.constants';

@Injectable()
export class ActivateFamilyService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<{ message: string }> {
    const family = await this.prisma.family.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        isActive: true,
      },
    });

    if (!family) {
      return {
        message: FAMILY_MESSAGES.NOT_FOUND,
      };
    }

    if (family.isActive) {
      return {
        message: FAMILY_MESSAGES.ACTIVATED,
      };
    }

    await this.prisma.family.update({
      where: {
        id,
      },
      data: {
        isActive: true,
      },
    });

    return {
      message: FAMILY_MESSAGES.ACTIVATED,
    };
  }
}
