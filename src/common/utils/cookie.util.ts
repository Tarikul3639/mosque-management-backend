import { Response, CookieOptions } from 'express';
import { ConfigService } from '@nestjs/config';

import { ACCESS_TOKEN_COOKIE } from '../constants/cookie.constants';

export class CookieUtil {
  private static getCookieOptions(configService: ConfigService): CookieOptions {
    return {
      httpOnly: true,
      secure: configService.getOrThrow<boolean>('app.isProduction'),
      sameSite: 'lax',
      path: '/',
      maxAge: configService.getOrThrow<number>('cookies.maxAge'),
    };
  }

  static setAccessToken(
    response: Response,
    token: string,
    configService: ConfigService,
  ): void {
    response.cookie(
      ACCESS_TOKEN_COOKIE,
      token,
      this.getCookieOptions(configService),
    );
  }

  static clearAccessToken(
    response: Response,
    configService: ConfigService,
  ): void {
    response.clearCookie(
      ACCESS_TOKEN_COOKIE,
      this.getCookieOptions(configService),
    );
  }
}
