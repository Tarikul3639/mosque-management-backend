import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { JwtPayload } from '@/common/interfaces/jwt-payload.interface';
import { PrismaService } from '@/common/prisma/prisma.service';
import { comparePassword } from '@/common/utils/password.util';

import { UserStatus } from '@/lib/prisma/client';

import { LoginRequestDto } from '../dto/requests/login-request.dto';
import { LoginResult } from '../interfaces/login-result.interface';

import { TokenService } from './token.service';

@Injectable()
export class LoginService {
    private readonly logger = new Logger(LoginService.name);

    constructor(
        private readonly prismaService: PrismaService,
        private readonly tokenService: TokenService,
    ) { }

    async execute(loginDto: LoginRequestDto): Promise<LoginResult> {
        const { email, password } = loginDto;

        const user = await this.prismaService.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                avatar: {
                    select: {
                        url: true,
                    },
                },
                password: true,
                status: true,
                role: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password.');
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password.');
        }

        if (user.status !== UserStatus.ACTIVE) {
            throw new UnauthorizedException('Your account is inactive.');
        }

        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role.name,
        };

        const accessToken = await this.tokenService.generateAccessToken(payload);

        await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: {
                lastLoginAt: new Date(),
            },
        });

        this.logger.log(`User ${user.email} logged in.`);

        return {
            accessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar?.url || null,
                role: user.role.name,
            },
        };
    }
}
