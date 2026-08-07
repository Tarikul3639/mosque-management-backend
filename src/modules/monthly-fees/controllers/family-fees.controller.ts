import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { UserRole } from '../../../lib/prisma/client';

import { CreateFamilyFeeDto } from '../dto/requests/create-family-fee.dto';
import { UpdateFamilyFeeDto } from '../dto/requests/update-family-fee.dto';

import { FamilyFeeResponseDto } from '../dto/responses/family-fee-response.dto';

import { CreateFamilyFeeService } from '../services/create-family-fee.service';
import { UpdateFamilyFeeService } from '../services/update-family-fee.service';
import { GetCurrentFamilyFeeService } from '../services/get-current-family-fee.service';
import { GetFamilyFeeHistoryService } from '../services/get-family-fee-history.service';

@ApiTags('Family Fees')
@Controller()
export class FamilyFeesController {
  constructor(
    private readonly createFamilyFeeService: CreateFamilyFeeService,
    private readonly updateFamilyFeeService: UpdateFamilyFeeService,
    private readonly getCurrentFamilyFeeService: GetCurrentFamilyFeeService,
    private readonly getFamilyFeeHistoryService: GetFamilyFeeHistoryService,
  ) {}

  // ----------------------------------
  // Public APIs
  // ----------------------------------

  @Get('families/:familyId/current-fee')
  @ApiOperation({
    summary: 'Get current family fee',
  })
  @ApiResponse({
    status: 200,
    type: FamilyFeeResponseDto,
  })
  async getCurrentFee(
    @Param('familyId') familyId: string,
  ): Promise<FamilyFeeResponseDto> {
    return this.getCurrentFamilyFeeService.execute(familyId);
  }

  @Get('families/:familyId/fee-history')
  @ApiOperation({
    summary: 'Get family fee history',
  })
  @ApiResponse({
    status: 200,
    type: [FamilyFeeResponseDto],
  })
  async getHistory(
    @Param('familyId') familyId: string,
  ): Promise<FamilyFeeResponseDto[]> {
    return this.getFamilyFeeHistoryService.execute(familyId);
  }

  // ----------------------------------
  // Protected APIs
  // ----------------------------------

  @Post('families/:familyId/fees')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Create family fee',
  })
  @ApiResponse({
    status: 201,
    type: FamilyFeeResponseDto,
  })
  async create(
    @Param('familyId') familyId: string,
    @Body() dto: CreateFamilyFeeDto,
  ): Promise<FamilyFeeResponseDto> {
    return this.createFamilyFeeService.execute(familyId, dto);
  }

  @Patch('family-fees/:feeId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Update family fee',
  })
  @ApiResponse({
    status: 200,
    type: FamilyFeeResponseDto,
  })
  async update(
    @Param('feeId') feeId: string,
    @Body() dto: UpdateFamilyFeeDto,
  ): Promise<FamilyFeeResponseDto> {
    return this.updateFamilyFeeService.execute(feeId, dto);
  }
}
