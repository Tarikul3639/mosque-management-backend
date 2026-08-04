import { Module } from '@nestjs/common';

import { PrismaModule } from '@/common/prisma/prisma.module';
// Controllers
import { FamilyFeesController } from './controllers/family-fees.controller';
// Family Fees Services
import { CreateFamilyFeeService } from './services/create-family-fee.service';
import { UpdateFamilyFeeService } from './services/update-family-fee.service';
import { GetCurrentFamilyFeeService } from './services/get-current-family-fee.service';
import { GetFamilyFeeHistoryService } from './services/get-family-fee-history.service';

@Module({
  imports: [PrismaModule],

  controllers: [FamilyFeesController],

  providers: [
    // Family Fees Services
    CreateFamilyFeeService,
    UpdateFamilyFeeService,
    GetCurrentFamilyFeeService,
    GetFamilyFeeHistoryService,
  ],

  exports: [
    CreateFamilyFeeService,
    UpdateFamilyFeeService,
    GetCurrentFamilyFeeService,
    GetFamilyFeeHistoryService,
  ],
})
export class MonthlyFeesModule {}
