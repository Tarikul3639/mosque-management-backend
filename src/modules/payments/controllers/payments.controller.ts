import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreatePaymentDto } from '../dto/requests/create-payment.dto';
import { FamilyLedgerQueryDto } from '../dto/requests/family-ledger-query.dto';
import { PaymentQueryDto } from '../dto/requests/payment-query.dto';
import { PaymentSummaryQueryDto } from '../dto/requests/payment-summary-query.dto';
import { UpdatePaymentDto } from '../dto/requests/update-payment.dto';

import { CreatePaymentService } from '../services/create-payment.service';
import { DeletePaymentService } from '../services/delete-payment.service';
import { GetFamilyLedgerService } from '../services/get-family-ledger.service';
import { GenerateReceiptService } from '../services/generate-receipt.service';
import { GetPaymentService } from '../services/get-payment.service';
import { ListPaymentsService } from '../services/list-payments.service';
import { GetPaymentSummaryService } from '../services/get-payment-summary.service';
import { UpdatePaymentService } from '../services/update-payment.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly createPaymentService: CreatePaymentService,
    private readonly listPaymentsService: ListPaymentsService,
    private readonly getPaymentService: GetPaymentService,
    private readonly updatePaymentService: UpdatePaymentService,
    private readonly deletePaymentService: DeletePaymentService,
    private readonly getPaymentSummaryService: GetPaymentSummaryService,
    private readonly generateReceiptService: GenerateReceiptService,
    private readonly getFamilyLedgerService: GetFamilyLedgerService,
  ) {}

  @Post()
  create(
    @Body() dto: CreatePaymentDto,
  ) {
    return this.createPaymentService.execute(dto);
  }

  @Get()
  findAll(
    @Query() query: PaymentQueryDto,
  ) {
    return this.listPaymentsService.execute(query);
  }

  @Get('summary')
  summary(
    @Query() query: PaymentSummaryQueryDto,
  ) {
    return this.getPaymentSummaryService.execute(query);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.getPaymentService.execute(id);
  }

  @Get(':id/receipt')
  receipt(
    @Param('id') id: string,
  ) {
    return this.generateReceiptService.execute(id);
  }

  @Get('family/:familyId/ledger')
  familyLedger(
    @Param('familyId') familyId: string,
    @Query() query: FamilyLedgerQueryDto,
  ) {
    return this.getFamilyLedgerService.execute(
      familyId,
      query,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePaymentDto,
  ) {
    return this.updatePaymentService.execute(
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.deletePaymentService.execute(id);
  }
}