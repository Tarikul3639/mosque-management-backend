import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET,
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  resetPasswordSecret: process.env.JWT_RESET_PASSWORD_SECRET,
  resetPasswordExpiresIn: process.env.JWT_RESET_PASSWORD_EXPIRES_IN,
}));
