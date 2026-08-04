import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
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

import { CreateDevelopmentProjectDto } from '../dto/requests/create-development-project.dto';
import { DevelopmentProjectQueryDto } from '../dto/requests/development-project-query.dto';
import { UpdateDevelopmentProjectDto } from '../dto/requests/update-development-project.dto';
import { DevelopmentProjectListResponseDto } from '../dto/responses/development-project-list-response.dto';
import { DevelopmentProjectResponseDto } from '../dto/responses/development-project-response.dto';
import { DevelopmentProjectSummaryResponseDto } from '../dto/responses/development-project-summary-response.dto';

import { CreateDevelopmentProjectService } from '../services/create-development-project.service';
import { DeleteDevelopmentProjectService } from '../services/delete-development-project.service';
import { GetDevelopmentProjectService } from '../services/get-development-project.service';
import { GetDevelopmentProjectSummaryService } from '../services/get-development-project-summary.service';
import { ListDevelopmentProjectsService } from '../services/list-development-projects.service';
import { UpdateDevelopmentProjectService } from '../services/update-development-project.service';

@ApiTags('Development Projects')
@Controller('development-projects')
export class DevelopmentProjectsController {
  constructor(
    private readonly createDevelopmentProjectService: CreateDevelopmentProjectService,
    private readonly updateDevelopmentProjectService: UpdateDevelopmentProjectService,
    private readonly deleteDevelopmentProjectService: DeleteDevelopmentProjectService,
    private readonly getDevelopmentProjectService: GetDevelopmentProjectService,
    private readonly listDevelopmentProjectsService: ListDevelopmentProjectsService,
    private readonly getDevelopmentProjectSummaryService: GetDevelopmentProjectSummaryService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'List development projects',
  })
  @ApiResponse({
    status: 200,
    type: DevelopmentProjectListResponseDto,
  })
  async findAll(
    @Query() query: DevelopmentProjectQueryDto,
  ): Promise<DevelopmentProjectListResponseDto> {
    return this.listDevelopmentProjectsService.execute(query);
  }

  @Get('summary')
  @ApiOperation({
    summary: 'Get development project summary',
  })
  @ApiResponse({
    status: 200,
    type: DevelopmentProjectSummaryResponseDto,
  })
  async summary(): Promise<DevelopmentProjectSummaryResponseDto> {
    return this.getDevelopmentProjectSummaryService.execute();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get development project by ID',
  })
  @ApiResponse({
    status: 200,
    type: DevelopmentProjectResponseDto,
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<DevelopmentProjectResponseDto> {
    return this.getDevelopmentProjectService.execute(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create development project',
  })
  @ApiResponse({
    status: 201,
    type: DevelopmentProjectResponseDto,
  })
  async create(
    @Body() dto: CreateDevelopmentProjectDto,
    @Req() req: any,
  ): Promise<DevelopmentProjectResponseDto> {
    return this.createDevelopmentProjectService.execute(dto, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update development project',
  })
  @ApiResponse({
    status: 200,
    type: DevelopmentProjectResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDevelopmentProjectDto,
    @Req() req: any,
  ): Promise<DevelopmentProjectResponseDto> {
    return this.updateDevelopmentProjectService.execute(
      id,
      dto,
      req.user.id,
      req.user.role,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete development project',
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        message: 'Development project deleted successfully.',
      },
    },
  })
  async remove(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<{ message: string }> {
    return this.deleteDevelopmentProjectService.execute(
      id,
      req.user.id,
      req.user.role,
    );
  }
}
