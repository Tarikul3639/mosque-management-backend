import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { type StringValue } from 'ms';

import { JwtPayload } from '@/common/interfaces/jwt-payload.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // ==========================
  // Access Token
  // ==========================

  async generateAccessToken(payload: JwtPayload): Promise<string> {
    const expiresIn = this.configService.getOrThrow<StringValue>(
      'auth.accessExpiresIn',
    );

    return this.jwtService.signAsync(payload, {
      secret: this.getAccessSecret(),
      expiresIn,
    });
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.getAccessSecret(),
    });
  }

  // ==========================
  // Reset Password Token
  // ==========================

  async generateResetPasswordToken(payload: JwtPayload): Promise<string> {
    const expiresIn = this.configService.getOrThrow<StringValue>(
      'auth.resetPasswordExpiresIn',
    );

    return this.jwtService.signAsync(payload, {
      secret: this.getResetPasswordSecret(),
      expiresIn,
    });
  }

  async verifyResetPasswordToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.getResetPasswordSecret(),
    });
  }

  // ==========================
  // Secrets
  // ==========================

  private getAccessSecret(): string {
    return this.configService.getOrThrow<string>('auth.accessSecret');
  }

  private getResetPasswordSecret(): string {
    return this.configService.getOrThrow<string>('auth.resetPasswordSecret');
  }
}
