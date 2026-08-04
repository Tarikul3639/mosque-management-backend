import { Module } from '@nestjs/common';

import { PrismaModule } from '@/common/prisma/prisma.module';

import { DonationsController } from './controllers/donations.controller';

import { CreateDonationService } from './services/create-donation.service';
import { UpdateDonationService } from './services/update-donation.service';
import { DeleteDonationService } from './services/delete-donation.service';
import { GetDonationService } from './services/get-donation.service';
import { ListDonationsService } from './services/list-donations.service';
import { GetDonationSummaryService } from './services/get-donation-summary.service';
import { GetDonorHistoryService } from './services/get-donor-history.service';
import { GenerateDonationReceiptService } from './services/generate-donation-receipt.service';

@Module({
  imports: [PrismaModule],

  controllers: [DonationsController],

  providers: [
    CreateDonationService,
    UpdateDonationService,
    DeleteDonationService,
    GetDonationService,
    ListDonationsService,
    GetDonationSummaryService,
    GetDonorHistoryService,
    GenerateDonationReceiptService,
  ],

  exports: [
    CreateDonationService,
    UpdateDonationService,
    DeleteDonationService,
    GetDonationService,
    ListDonationsService,
    GetDonationSummaryService,
    GetDonorHistoryService,
    GenerateDonationReceiptService,
  ],
})
export class DonationsModule {}
