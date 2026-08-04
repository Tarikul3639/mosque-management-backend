// src/modules/payments/controllers/payments.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

import { CreatePaymentDto } from '../dto/requests/create-payment.dto';
import { FamilyLedgerQueryDto } from '../dto/requests/family-ledger-query.dto';
import { PaymentQueryDto } from '../dto/requests/payment-query.dto';
import { PaymentSummaryQueryDto } from '../dto/requests/payment-summary-query.dto';
import { UpdatePaymentDto } from '../dto/requests/update-payment.dto';

import { FamilyLedgerResponseDto } from '../dto/responses/family-ledger-response.dto';
import { PaymentListResponseDto } from '../dto/responses/payment-list-response.dto';
import { PaymentResponseDto } from '../dto/responses/payment-response.dto';
import { PaymentSummaryResponseDto } from '../dto/responses/payment-summary-response.dto';

import { CreatePaymentService } from '../services/create-payment.service';
import { DeletePaymentService } from '../services/delete-payment.service';
import { GenerateReceiptService } from '../services/generate-receipt.service';
import { GetFamilyLedgerService } from '../services/get-family-ledger.service';
import { GetPaymentService } from '../services/get-payment.service';
import { GetPaymentSummaryService } from '../services/get-payment-summary.service';
import { ListPaymentsService } from '../services/list-payments.service';
import { UpdatePaymentService } from '../services/update-payment.service';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@ApiTags('Payments')
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

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({
    status: 201,
    description: 'Payment created successfully.',
    type: PaymentResponseDto,
  })
  create(
    @Body() dto: CreatePaymentDto,
    @CurrentUser('sub') userId: string,
  ): Promise<PaymentResponseDto> {
    console.log('Creating payment with DTO:', dto, 'by user:', userId);
    return this.createPaymentService.execute(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({
    status: 200,
    description: 'List of payments.',
    type: PaymentListResponseDto,
  })
  findAll(@Query() query: PaymentQueryDto): Promise<PaymentListResponseDto> {
    return this.listPaymentsService.execute(query);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get payment summary' })
  @ApiResponse({
    status: 200,
    description: 'Payment summary.',
    type: PaymentSummaryResponseDto,
  })
  summary(
    @Query() query: PaymentSummaryQueryDto,
  ): Promise<PaymentSummaryResponseDto> {
    return this.getPaymentSummaryService.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by ID' })
  @ApiParam({
    name: 'id',
    description: 'Payment ID',
    example: 'cmf6m9o7j0001w8z8t2b0r7j4',
  })
  @ApiResponse({
    status: 200,
    description: 'Payment details.',
    type: PaymentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  findOne(@Param('id') id: string): Promise<PaymentResponseDto> {
    return this.getPaymentService.execute(id);
  }

  @Get(':id/receipt')
  @ApiOperation({ summary: 'Download payment receipt PDF' })
  @ApiParam({
    name: 'id',
    description: 'Payment ID',
  })
  @ApiResponse({
    status: 200,
    description: 'PDF receipt',
  })
  async receipt(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const { fileName, buffer } = await this.generateReceiptService.execute(id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  @Get('family/:familyId/ledger')
  @ApiOperation({ summary: 'Get family payment ledger' })
  @ApiParam({
    name: 'familyId',
    description: 'Family ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Family ledger.',
    type: FamilyLedgerResponseDto,
  })
  familyLedger(
    @Param('familyId') familyId: string,
    @Query() query: FamilyLedgerQueryDto,
  ): Promise<FamilyLedgerResponseDto> {
    return this.getFamilyLedgerService.execute(familyId, query);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a payment' })
  @ApiParam({
    name: 'id',
    description: 'Payment ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Payment updated successfully.',
    type: PaymentResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePaymentDto,
    @CurrentUser('sub') userId: string,
  ): Promise<PaymentResponseDto> {
    return this.updatePaymentService.execute(id, dto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment' })
  @ApiParam({
    name: 'id',
    description: 'Payment ID',
  })
  @ApiResponse({ status: 200, description: 'Payment deleted successfully.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.deletePaymentService.execute(id);
  }
}
