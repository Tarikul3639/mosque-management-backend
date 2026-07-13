import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { JwtPayload } from '@/common/interfaces/jwt-payload.interface';

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<{
      user: JwtPayload;
    }>();

    const user = request.user;
    return data ? user[data] : user;
  },
);
