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

import { CreateProjectDto } from '../dto/requests/create-project.dto';
import { ProjectQueryDto } from '../dto/requests/project-query.dto';
import { UpdateProjectDto } from '../dto/requests/update-project.dto';
import { ProjectListResponseDto } from '../dto/responses/project-list-response.dto';
import { ProjectResponseDto } from '../dto/responses/project-response.dto';
import { ProjectSummaryResponseDto } from '../dto/responses/project-summary-response.dto';

import { CreateProjectService } from '../services/create-project.service';
import { DeleteProjectService } from '../services/delete-project.service';
import { GetProjectService } from '../services/get-project.service';
import { GetProjectSummaryService } from '../services/get-project-summary.service';
import { ListProjectsService } from '../services/list-projects.service';
import { UpdateProjectService } from '../services/update-project.service';

@ApiTags('Development Projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly createProjectService: CreateProjectService,
    private readonly updateProjectService: UpdateProjectService,
    private readonly deleteProjectService: DeleteProjectService,
    private readonly getProjectService: GetProjectService,
    private readonly listProjectsService: ListProjectsService,
    private readonly getProjectSummaryService: GetProjectSummaryService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'List development projects',
  })
  @ApiResponse({
    status: 200,
    type: ProjectListResponseDto,
  })
  async findAll(
    @Query() query: ProjectQueryDto,
  ): Promise<ProjectListResponseDto> {
    return this.listProjectsService.execute(query);
  }

  @Get('summary')
  @ApiOperation({
    summary: 'Get development project summary',
  })
  @ApiResponse({
    status: 200,
    type: ProjectSummaryResponseDto,
  })
  async summary(): Promise<ProjectSummaryResponseDto> {
    return this.getProjectSummaryService.execute();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get development project by ID',
  })
  @ApiResponse({
    status: 200,
    type: ProjectResponseDto,
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<ProjectResponseDto> {
    return this.getProjectService.execute(id);
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
    type: ProjectResponseDto,
  })
  async create(
    @Body() dto: CreateProjectDto,
    @Req() req: any,
  ): Promise<ProjectResponseDto> {
    return this.createProjectService.execute(dto, req.user.id);
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
    type: ProjectResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
    @Req() req: any,
  ): Promise<ProjectResponseDto> {
    return this.updateProjectService.execute(
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
    return this.deleteProjectService.execute(
      id,
      req.user.id,
      req.user.role,
    );
  }
}
