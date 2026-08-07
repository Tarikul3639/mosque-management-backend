import { Module } from '@nestjs/common';

import { PrismaModule } from '../../common/prisma/prisma.module';

import { DonorsController } from './controllers/donors.controller';

import { CreateDonorService } from './services/create-donor.service';
import { UpdateDonorService } from './services/update-donor.service';
import { DeleteDonorService } from './services/delete-donor.service';
import { GetDonorService } from './services/get-donor.service';
import { ListDonorsService } from './services/list-donors.service';

@Module({
  imports: [PrismaModule],

  controllers: [DonorsController],

  providers: [
    CreateDonorService,
    UpdateDonorService,
    DeleteDonorService,
    GetDonorService,
    ListDonorsService,
  ],

  exports: [
    CreateDonorService,
    UpdateDonorService,
    DeleteDonorService,
    GetDonorService,
    ListDonorsService,
  ],
})
export class DonorsModule {}
