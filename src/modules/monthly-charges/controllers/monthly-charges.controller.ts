import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from '@/common/decorators/roles.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { UserRole } from '@/lib/prisma/client';

import { GenerateMonthlyChargesDto } from '../dto/requests/generate-monthly-charges.dto';
import { MonthlyChargeQueryDto } from '../dto/requests/monthly-charge-query.dto';
import { UpdateMonthlyChargeDto } from '../dto/requests/update-monthly-charge.dto';

import { GenerateMonthlyChargesResponseDto } from '../dto/responses/generate-monthly-charges-response.dto';
import { MonthlyChargeListResponseDto } from '../dto/responses/monthly-charge-list-response.dto';
import { MonthlyChargeResponseDto } from '../dto/responses/monthly-charge-response.dto';

import { GenerateMonthlyChargesService } from '../services/generate-monthly-charges.service';
import { GetMonthlyChargeService } from '../services/get-monthly-charge.service';
import { ListMonthlyChargesService } from '../services/list-monthly-charges.service';
import { UpdateMonthlyChargeService } from '../services/update-monthly-charge.service';
import { DeleteMonthlyChargeService } from '../services/delete-monthly-charge.service';

@ApiTags('Family Monthly Charges')
@Controller('monthly-charges')
export class MonthlyChargesController {
  constructor(
    private readonly generateMonthlyChargesService: GenerateMonthlyChargesService,
    private readonly getMonthlyChargeService: GetMonthlyChargeService,
    private readonly listMonthlyChargesService: ListMonthlyChargesService,
    private readonly updateMonthlyChargeService: UpdateMonthlyChargeService,
    private readonly deleteMonthlyChargeService: DeleteMonthlyChargeService,
  ) {}

  // -----------------------------
  // Protected APIs
  // -----------------------------

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get monthly charge list',
  })
  @ApiResponse({
    status: 200,
    type: MonthlyChargeListResponseDto,
  })
  async findAll(
    @Query() query: MonthlyChargeQueryDto,
  ): Promise<MonthlyChargeListResponseDto> {
    return this.listMonthlyChargesService.execute(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get monthly charge details',
  })
  @ApiResponse({
    status: 200,
    type: MonthlyChargeResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<MonthlyChargeResponseDto> {
    return this.getMonthlyChargeService.execute(id);
  }

  @Post('generate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Generate monthly charges',
  })
  @ApiResponse({
    status: 201,
    type: GenerateMonthlyChargesResponseDto,
  })
  async generate(
    @Body() dto: GenerateMonthlyChargesDto,
  ): Promise<GenerateMonthlyChargesResponseDto> {
    return this.generateMonthlyChargesService.execute(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Update monthly charge',
  })
  @ApiResponse({
    status: 200,
    type: MonthlyChargeResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMonthlyChargeDto,
  ): Promise<MonthlyChargeResponseDto> {
    return this.updateMonthlyChargeService.execute(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Delete monthly charge',
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        message: 'Monthly charge deleted successfully.',
      },
    },
  })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.deleteMonthlyChargeService.execute(id);
  }
}
