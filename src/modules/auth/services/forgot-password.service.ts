import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { MailService } from '@/common/mail/mail.service';
import { JwtPayload } from '@/common/interfaces/jwt-payload.interface';
import { PrismaService } from '@/common/prisma/prisma.service';

import { TokenService } from './token.service';

@Injectable()
export class ForgotPasswordService {
  private readonly logger = new Logger(ForgotPasswordService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
  ) { }

  async execute(email: string): Promise<void> {
    this.logger.log(`Initiating password reset for email: ${email}`);

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role.name,
    };

    const token = await this.tokenService.generateResetPasswordToken(payload);

    await this.mailService.sendResetPasswordEmail(
      user.email,
      user.fullName,
      token,
    );

    this.logger.log(`Password reset link sent to ${user.email}`);

    // Remove this in production
    console.log(token);
  }
}
