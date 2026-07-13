import { Response, CookieOptions } from "express";
import { ConfigService } from "@nestjs/config";

import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "../constants/cookie.constants";

export class CookieUtil {
  private static getAccessCookieOptions(
    configService: ConfigService,
  ): CookieOptions {
    return {
      httpOnly: true,
      secure: configService.getOrThrow<boolean>("app.isProduction"),
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60 * 1000, // 15 minutes
    };
  }

  private static getRefreshCookieOptions(
    configService: ConfigService,
  ): CookieOptions {
    return {
      httpOnly: true,
      secure: configService.getOrThrow<boolean>("app.isProduction"),
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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
      this.getAccessCookieOptions(configService),
    );
  }

  static setRefreshToken(
    response: Response,
    token: string,
    configService: ConfigService,
  ): void {
    response.cookie(
      REFRESH_TOKEN_COOKIE,
      token,
      this.getRefreshCookieOptions(configService),
    );
  }

  static clearAccessToken(response: Response): void {
    response.clearCookie(ACCESS_TOKEN_COOKIE, {
      path: "/",
    });
  }

  static clearRefreshToken(response: Response): void {
    response.clearCookie(REFRESH_TOKEN_COOKIE, {
      path: "/",
    });
  }

  static clearAuthCookies(response: Response): void {
    this.clearAccessToken(response);
    this.clearRefreshToken(response);
  }
}