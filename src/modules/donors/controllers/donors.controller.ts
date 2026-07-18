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

import { CreateDonorDto } from '../dto/requests/create-donor.dto';
import { UpdateDonorDto } from '../dto/requests/update-donor.dto';
import { DonorQueryDto } from '../dto/requests/donor-query.dto';

import { DonorResponseDto } from '../dto/responses/donor-response.dto';
import { DonorListResponseDto } from '../dto/responses/donor-list-response.dto';

import { CreateDonorService } from '../services/create-donor.service';
import { UpdateDonorService } from '../services/update-donor.service';
import { DeleteDonorService } from '../services/delete-donor.service';
import { GetDonorService } from '../services/get-donor.service';
import { ListDonorsService } from '../services/list-donors.service';

@ApiTags('Donors')
@Controller('donors')
export class DonorsController {
  constructor(
    private readonly createDonorService: CreateDonorService,
    private readonly updateDonorService: UpdateDonorService,
    private readonly deleteDonorService: DeleteDonorService,
    private readonly getDonorService: GetDonorService,
    private readonly listDonorsService: ListDonorsService,
  ) {}

  // -----------------------------
  // Public APIs
  // -----------------------------

  @Get()
  @ApiOperation({
    summary: 'Get donor list',
  })
  @ApiResponse({
    status: 200,
    type: DonorListResponseDto,
  })
  async findAll(
    @Query() query: DonorQueryDto,
  ): Promise<DonorListResponseDto> {
    return this.listDonorsService.execute(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get donor details',
  })
  @ApiResponse({
    status: 200,
    type: DonorResponseDto,
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<DonorResponseDto> {
    return this.getDonorService.execute(id);
  }

  // -----------------------------
  // Protected APIs
  // -----------------------------

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Create donor',
  })
  @ApiResponse({
    status: 201,
    type: DonorResponseDto,
  })
  async create(
    @Body() dto: CreateDonorDto,
  ): Promise<DonorResponseDto> {
    return this.createDonorService.execute(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Update donor',
  })
  @ApiResponse({
    status: 200,
    type: DonorResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDonorDto,
  ): Promise<DonorResponseDto> {
    return this.updateDonorService.execute(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Delete donor',
  })
  @ApiResponse({
    status: 200,
  })
  async delete(
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    return this.deleteDonorService.execute(id);
  }
}