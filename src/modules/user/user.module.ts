import { Module } from '@nestjs/common';

import { UserController } from './controllers/user.controller';

import { GetUserSummaryService } from './services/get-user-summary.service';
import { CreateUserService } from './services/create-user.service';
import { GetUsersService } from './services/get-users.service';
import { GetUserService } from './services/get-user.service';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';

@Module({
  controllers: [UserController],
  providers: [
    GetUserSummaryService,
    CreateUserService,
    GetUsersService,
    GetUserService,
    UpdateUserService,
    DeleteUserService,
  ],
  exports: [
    GetUserService, // Exported in case other modules need to fetch user details
  ],
})
export class UserModule {}
