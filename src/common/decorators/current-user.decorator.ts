import { createParamDecorator } from '@nestjs/common';

import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

export const CurrentUser = createParamDecorator<keyof JwtPayload | undefined>(
  (data, context) => {
    const request = context.switchToHttp().getRequest<{
      user: JwtPayload;
    }>();

    const user = request.user;

    return data ? user[data] : user;
  },
);
