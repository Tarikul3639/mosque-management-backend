import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { TokenService } from './token.service';

import { PrismaService } from '../../../common/prisma/prisma.service';
import { comparePassword, hashPassword } from '../../../common/utils/hash';

import { ResetPasswordDto } from '../dto/requests/reset-password.dto';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async execute(dto: ResetPasswordDto): Promise<void> {
    const { token, newPassword } = dto;

    let payload;

    try {
      payload = await this.tokenService.verifyResetPasswordToken(token);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Reset password link has expired.');
      }

      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException('Invalid reset password link.');
      }

      throw error;
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isSamePassword = await comparePassword(newPassword, user.password);

    if (isSamePassword) {
      throw new BadRequestException(
        'New password must be different from the current password.',
      );
    }

    const hashedPassword = await hashPassword(
      newPassword,
      this.configService.getOrThrow<number>('bcrypt.saltRounds'),
    );

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
  }
}
