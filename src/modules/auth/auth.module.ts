import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaModule } from '@/common/prisma/prisma.module';
import { JwtStrategy } from '@/common/strategies/jwt.strategy';
import { MailModule } from '@/common/mail';
import type { StringValue } from 'ms';

import { AuthController } from './controllers/auth.controller';
import { LoginService } from './services/login.service';
import { GetMeService } from './services/get-me.service';
import { TokenService } from './services/token.service';
import { ForgotPasswordService } from './services/forgot-password.service';
import { ResetPasswordService } from './services/reset-password.service';

@Module({
  imports: [
    MailModule,
    PrismaModule,
    JwtModule.registerAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('auth.accessSecret'),

        signOptions: {
          expiresIn: configService.getOrThrow<StringValue>(
            'auth.accessExpiresIn',
          ),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginService,
    GetMeService,
    TokenService,
    JwtStrategy,
    ForgotPasswordService,
    ResetPasswordService,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
