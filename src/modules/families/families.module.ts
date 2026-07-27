import { Module } from '@nestjs/common';

import { PrismaModule } from '@/common/prisma/prisma.module';
// Controllers
import { FamiliesController } from './controllers/families.controller';
import { FamilyFeesController } from './controllers/family-fees.controller';
import { MonthlyChargesController } from './controllers/monthly-charges.controller';
// Families Services
import { CreateFamilyService } from './services/create-family.service';
import { UpdateFamilyService } from './services/update-family.service';
import { DeleteFamilyService } from './services/delete-family.service';
import { GetFamilyService } from './services/get-family.service';
import { ListFamiliesService } from './services/list-families.service';
import { GetFamilyStatsService } from './services/get-family-stats.service';
// Family Fees Services
import { CreateFamilyFeeService } from './services/create-family-fee.service';
import { UpdateFamilyFeeService } from './services/update-family-fee.service';
import { GetCurrentFamilyFeeService } from './services/get-current-family-fee.service';
import { GetFamilyFeeHistoryService } from './services/get-family-fee-history.service';
// Monthly Charges Services
import { GenerateMonthlyChargesService } from './services/generate-monthly-charges.service';
import { GetMonthlyChargeService } from './services/get-monthly-charge.service';
import { ListMonthlyChargesService } from './services/list-monthly-charges.service';
import { UpdateMonthlyChargeService } from './services/update-monthly-charge.service';
import { DeleteMonthlyChargeService } from './services/delete-monthly-charge.service';

@Module({
  imports: [PrismaModule],

  controllers: [
    FamiliesController,
    MonthlyChargesController,
    FamilyFeesController,
  ],

  providers: [
    CreateFamilyService,
    UpdateFamilyService,
    DeleteFamilyService,
    GetFamilyService,
    ListFamiliesService,
    GetFamilyStatsService,
    // Family Fees Services
    CreateFamilyFeeService,
    UpdateFamilyFeeService,
    GetCurrentFamilyFeeService,
    GetFamilyFeeHistoryService,
    // Monthly Charges Services
    GenerateMonthlyChargesService,
    GetMonthlyChargeService,
    ListMonthlyChargesService,
    UpdateMonthlyChargeService,
    DeleteMonthlyChargeService,
  ],

  exports: [
    CreateFamilyService,
    UpdateFamilyService,
    DeleteFamilyService,
    GetFamilyService,
    ListFamiliesService,

    CreateFamilyFeeService,
    UpdateFamilyFeeService,
    GetCurrentFamilyFeeService,
    GetFamilyFeeHistoryService,

    GenerateMonthlyChargesService,
  ],
})
export class FamiliesModule { }
