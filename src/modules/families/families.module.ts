import { Module } from '@nestjs/common';

import { PrismaModule } from '@/common/prisma/prisma.module';
// Controllers
import { FamiliesController } from './controllers/families.controller';
// Families Services
import { CreateFamilyService } from './services/create-family.service';
import { UpdateFamilyService } from './services/update-family.service';
import { DeleteFamilyService } from './services/delete-family.service';
import { GetFamilyDetailsService } from './services/get-family-details.service';
import { ListFamiliesService } from './services/list-families.service';
import { GetFamilyStatsService } from './services/get-family-stats.service';
import { ActivateFamilyService } from './services/active-family.service';

@Module({
  imports: [PrismaModule],

  controllers: [
    FamiliesController,
  ],

  providers: [
    CreateFamilyService,
    UpdateFamilyService,
    DeleteFamilyService,
    GetFamilyDetailsService,
    ListFamiliesService,
    GetFamilyStatsService,
    ActivateFamilyService,
  ],

  exports: [
    CreateFamilyService,
    UpdateFamilyService,
    DeleteFamilyService,
    GetFamilyDetailsService,
    ListFamiliesService,
  ],
})
export class FamiliesModule {}
