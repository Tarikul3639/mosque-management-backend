import { Module } from '@nestjs/common';

import { PrismaModule } from '../../common/prisma/prisma.module';
// Controllers
import { MonthlyChargesController } from './controllers/monthly-charges.controller';
// Monthly Charges Services
import { GenerateMonthlyChargesService } from './services/generate-monthly-charges.service';
import { GetMonthlyChargeService } from './services/get-monthly-charge.service';
import { ListMonthlyChargesService } from './services/list-monthly-charges.service';
import { UpdateMonthlyChargeService } from './services/update-monthly-charge.service';
import { DeleteMonthlyChargeService } from './services/delete-monthly-charge.service';

@Module({
  imports: [PrismaModule],

  controllers: [MonthlyChargesController],

  providers: [
    // Monthly Charges Services
    GenerateMonthlyChargesService,
    GetMonthlyChargeService,
    ListMonthlyChargesService,
    UpdateMonthlyChargeService,
    DeleteMonthlyChargeService,
  ],

  exports: [GenerateMonthlyChargesService],
})
export class MonthlyChargesModule {}
