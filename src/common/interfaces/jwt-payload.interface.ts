import { UserRole } from '../../lib/prisma/client';

export class JwtPayload {
  sub!: string;
  email!: string;
  role!: UserRole;
}
