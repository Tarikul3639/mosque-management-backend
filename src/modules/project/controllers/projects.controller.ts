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

import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { UserRole } from '../../../lib/prisma/client';

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
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@ApiTags('Projects')
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
    summary: 'List projects',
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
    summary: 'Get project summary',
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
    summary: 'Get project by ID',
  })
  @ApiResponse({
    status: 200,
    type: ProjectResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<ProjectResponseDto> {
    return this.getProjectService.execute(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create project',
  })
  @ApiResponse({
    status: 201,
    type: ProjectResponseDto,
  })
  async create(
    @Body() dto: CreateProjectDto,
    @CurrentUser('sub') userId: string,
  ): Promise<ProjectResponseDto> {
    return this.createProjectService.execute(dto, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update project',
  })
  @ApiResponse({
    status: 200,
    type: ProjectResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
    @CurrentUser('sub') userId: string,
    @CurrentUser('role') role: UserRole,
  ): Promise<ProjectResponseDto> {
    return this.updateProjectService.execute(id, dto, userId, role);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete project',
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        message: 'Project deleted successfully.',
      },
    },
  })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: { sub: string; role: UserRole },
  ): Promise<{ message: string }> {
    return this.deleteProjectService.execute(id, user.sub, user.role);
  }
}
