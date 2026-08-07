import { Module } from '@nestjs/common';

import { PrismaModule } from '../../common/prisma/prisma.module';
import { PaymentsController } from './controllers/payments.controller';

import { CreatePaymentService } from './services/create-payment.service';
import { ListPaymentsService } from './services/list-payments.service';
import { GetPaymentService } from './services/get-payment.service';
import { UpdatePaymentService } from './services/update-payment.service';
import { DeletePaymentService } from './services/delete-payment.service';
import { GetPaymentSummaryService } from './services/get-payment-summary.service';
import { GenerateReceiptService } from './services/generate-receipt.service';
import { GetFamilyLedgerService } from './services/get-family-ledger.service';

@Module({
  imports: [PrismaModule],

  controllers: [PaymentsController],

  providers: [
    CreatePaymentService,
    ListPaymentsService,
    GetPaymentService,
    UpdatePaymentService,
    DeletePaymentService,
    GetPaymentSummaryService,
    GenerateReceiptService,
    GetFamilyLedgerService,
  ],

  exports: [
    CreatePaymentService,
    ListPaymentsService,
    GetPaymentService,
    UpdatePaymentService,
    DeletePaymentService,
    GetPaymentSummaryService,
    GenerateReceiptService,
    GetFamilyLedgerService,
  ],
})
export class PaymentsModule {}
