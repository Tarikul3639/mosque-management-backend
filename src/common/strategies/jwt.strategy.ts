import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';

import { JwtPayload } from '@/common/interfaces/jwt-payload.interface';
import { ACCESS_TOKEN_COOKIE } from '@/common/constants/cookie.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string | null => {
          if (!request?.cookies) {
            return null;
          }

          return request.cookies[ACCESS_TOKEN_COOKIE] ?? null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('auth.accessSecret'),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    if (!payload) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
