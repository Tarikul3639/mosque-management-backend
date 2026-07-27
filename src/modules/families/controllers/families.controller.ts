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

import { CreateFamilyDto } from '../dto/requests/create-family.dto';
import { UpdateFamilyDto } from '../dto/requests/update-family.dto';
import { FamilyQueryDto } from '../dto/requests/family-query.dto';
import { FamilyStatsDto } from '../dto/responses/family-stats.dto';

import { FamilyResponseDto } from '../dto/responses/family-response.dto';
import { FamilyListResponseDto } from '../dto/responses/family-list-response.dto';

import { CreateFamilyService } from '../services/create-family.service';
import { UpdateFamilyService } from '../services/update-family.service';
import { DeleteFamilyService } from '../services/delete-family.service';
import { GetFamilyService } from '../services/get-family.service';
import { ListFamiliesService } from '../services/list-families.service';
import { GetFamilyStatsService } from '../services/get-family-stats.service';

@ApiTags('Families')
@Controller('families')
export class FamiliesController {
  constructor(
    private readonly getFamilyStatsService: GetFamilyStatsService,
    private readonly createFamilyService: CreateFamilyService,
    private readonly updateFamilyService: UpdateFamilyService,
    private readonly deleteFamilyService: DeleteFamilyService,
    private readonly getFamilyService: GetFamilyService,
    private readonly listFamiliesService: ListFamiliesService,
  ) { }

  // -----------------------------
  // Public APIs
  // -----------------------------

  @Get('stats')
  @ApiOperation({
    summary: 'Get family statistics',
  })
  @ApiResponse({
    status: 200,
    type: FamilyStatsDto,
  })
  async getStats(): Promise<FamilyStatsDto> {
    return this.getFamilyStatsService.execute();
  }

  @Get()
  @ApiOperation({
    summary: 'Get family list',
  })
  @ApiResponse({
    status: 200,
    type: FamilyListResponseDto,
  })
  async findAll(
    @Query() query: FamilyQueryDto,
  ): Promise<FamilyListResponseDto> {
    return this.listFamiliesService.execute(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get family details',
  })
  @ApiResponse({
    status: 200,
    type: FamilyResponseDto,
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<FamilyResponseDto> {
    return this.getFamilyService.execute(id);
  }

  // -----------------------------
  // Protected APIs
  // -----------------------------

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Create family',
  })
  async create(
    @Body() dto: CreateFamilyDto,
  ): Promise<FamilyResponseDto> {
    return this.createFamilyService.execute(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Update family',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateFamilyDto,
  ): Promise<FamilyResponseDto> {
    return this.updateFamilyService.execute(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Delete family',
  })
  async delete(
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    return this.deleteFamilyService.execute(id);
  }
}