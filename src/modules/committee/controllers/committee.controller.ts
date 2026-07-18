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

import { CreateCommitteeMemberDto } from '../dto/requests/create-committee-member.dto';
import { UpdateCommitteeMemberDto } from '../dto/requests/update-committee-member.dto';
import { CommitteeMemberQueryDto } from '../dto/requests/committee-member-query.dto';

import { CommitteeMemberResponseDto } from '../dto/responses/committee-member-response.dto';
import { CommitteeMemberListResponseDto } from '../dto/responses/committee-member-list-response.dto';

import { CreateCommitteeMemberService } from '../services/create-committee-member.service';
import { UpdateCommitteeMemberService } from '../services/update-committee-member.service';
import { GetCommitteeMemberService } from '../services/get-committee-member.service';
import { ListCommitteeMembersService } from '../services/list-committee-members.service';
import { DeactivateCommitteeMemberService } from '../services/deactivate-committee-member.service';
import { ActivateCommitteeMemberService } from '../services/activate-committee-member.service';
import { ForceDeleteCommitteeMemberService } from '../services/force-delete-committee-member.service';

@ApiTags('Committee')
@Controller('committee')
export class CommitteeController {
  constructor(
    private readonly createCommitteeMemberService: CreateCommitteeMemberService,
    private readonly updateCommitteeMemberService: UpdateCommitteeMemberService,
    private readonly getCommitteeMemberService: GetCommitteeMemberService,
    private readonly listCommitteeMembersService: ListCommitteeMembersService,
    private readonly deactivateCommitteeMemberService: DeactivateCommitteeMemberService,
    private readonly activateCommitteeMemberService: ActivateCommitteeMemberService,
    private readonly forceDeleteCommitteeMemberService: ForceDeleteCommitteeMemberService,
  ) {}

  // -----------------------------
  // Public APIs
  // -----------------------------

  @Get()
  @ApiOperation({
    summary: 'Get committee members',
  })
  @ApiResponse({
    status: 200,
    type: CommitteeMemberListResponseDto,
  })
  async findAll(
    @Query() query: CommitteeMemberQueryDto,
  ): Promise<CommitteeMemberListResponseDto> {
    return this.listCommitteeMembersService.execute(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get committee member details',
  })
  @ApiResponse({
    status: 200,
    type: CommitteeMemberResponseDto,
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<CommitteeMemberResponseDto> {
    return this.getCommitteeMemberService.execute(id);
  }

  // -----------------------------
  // Protected APIs
  // -----------------------------

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Create committee member',
  })
  @ApiResponse({
    status: 201,
    type: CommitteeMemberResponseDto,
  })
  async create(
    @Body() dto: CreateCommitteeMemberDto,
  ): Promise<CommitteeMemberResponseDto> {
    return this.createCommitteeMemberService.execute(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Update committee member',
  })
  @ApiResponse({
    status: 200,
    type: CommitteeMemberResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCommitteeMemberDto,
  ): Promise<CommitteeMemberResponseDto> {
    return this.updateCommitteeMemberService.execute(id, dto);
  }

  @Patch(':id/deactivate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Deactivate committee member',
  })
  async deactivate(
    @Param('id') id: string,
  ): Promise<void> {
    await this.deactivateCommitteeMemberService.execute(id);
  }

  @Patch(':id/activate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Activate committee member',
  })
  async activate(
    @Param('id') id: string,
  ): Promise<void> {
    await this.activateCommitteeMemberService.execute(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Force delete committee member',
  })
  async forceDelete(
    @Param('id') id: string,
  ): Promise<void> {
    await this.forceDeleteCommitteeMemberService.execute(id);
  }
}