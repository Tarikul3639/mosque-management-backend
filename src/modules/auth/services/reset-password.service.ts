import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '@/common/prisma/prisma.service';
import { hashPassword } from '@/common/utils/password.util';

import { ResetPasswordDto } from '../dto/requests/reset-password.dto';

@Injectable()
export class ResetPasswordService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async execute(dto: ResetPasswordDto): Promise<void> {

        const { token, newPassword } = dto;

        const payload = await this.jwtService.verifyAsync<{
            sub: string;
            email: string;
        }>(token, {
            secret: this.configService.getOrThrow<string>('auth.resetPasswordSecret'),
        });

        const user = await this.prismaService.user.findUnique({
            where: {
                id: payload.sub,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        const isSamePassword = await hashPassword(
            newPassword,
            this.configService.getOrThrow<number>('bcrypt.saltRounds'),
        );

        if (user.password === isSamePassword) {
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
