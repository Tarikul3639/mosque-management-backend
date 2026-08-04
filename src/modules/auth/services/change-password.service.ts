import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

import { comparePassword, hashPassword } from '@/common/utils/password.util';

@Injectable()
export class ChangePasswordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isPasswordValid = await comparePassword(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Current password is incorrect.');
    }

    const isSamePassword = await comparePassword(newPassword, user.password);

    if (isSamePassword) {
      throw new BadRequestException(
        'New password must be different from the current password.',
      );
    }

    const saltRounds =
      this.configService.getOrThrow<number>('bcrypt.saltRounds');

    const hashedPassword = await hashPassword(newPassword, saltRounds);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });
  }
}
