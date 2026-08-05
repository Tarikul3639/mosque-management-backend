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

import { CreateGalleryDto } from '../dto/requests/create-gallery.dto';
import { GalleryQueryDto } from '../dto/requests/gallery-query.dto';
import { UpdateGalleryDto } from '../dto/requests/update-gallery.dto';

import { GalleryListResponseDto } from '../dto/responses/gallery-list-response.dto';
import { GalleryResponseDto } from '../dto/responses/gallery-response.dto';
import { GallerySummaryResponseDto } from '../dto/responses/gallery-summary-response.dto';

import { CreateGalleryService } from '../services/create-gallery.service';
import { DeleteGalleryService } from '../services/delete-gallery.service';
import { GetGalleryService } from '../services/get-gallery.service';
import { GetGallerySummaryService } from '../services/get-gallery-summary.service';
import { ListGalleriesService } from '../services/list-galleries.service';
import { UpdateGalleryService } from '../services/update-gallery.service';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@ApiTags('Galleries')
@Controller('galleries')
export class GalleriesController {
  constructor(
    private readonly createGalleryService: CreateGalleryService,
    private readonly updateGalleryService: UpdateGalleryService,
    private readonly deleteGalleryService: DeleteGalleryService,
    private readonly getGalleryService: GetGalleryService,
    private readonly listGalleriesService: ListGalleriesService,
    private readonly getGallerySummaryService: GetGallerySummaryService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'List galleries',
  })
  @ApiResponse({
    status: 200,
    type: GalleryListResponseDto,
  })
  async findAll(
    @Query() query: GalleryQueryDto,
  ): Promise<GalleryListResponseDto> {
    return this.listGalleriesService.execute(query);
  }

  @Get('summary')
  @ApiOperation({
    summary: 'Get gallery summary',
  })
  @ApiResponse({
    status: 200,
    type: GallerySummaryResponseDto,
  })
  async summary(): Promise<GallerySummaryResponseDto> {
    return this.getGallerySummaryService.execute();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gallery by ID',
  })
  @ApiResponse({
    status: 200,
    type: GalleryResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<GalleryResponseDto> {
    return this.getGalleryService.execute(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create gallery',
  })
  @ApiResponse({
    status: 201,
    type: GalleryResponseDto,
  })
  async create(
    @Body() dto: CreateGalleryDto,
    @CurrentUser("sub") userId: string,
  ): Promise<GalleryResponseDto> {
    return this.createGalleryService.execute(dto, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update gallery',
  })
  @ApiResponse({
    status: 200,
    type: GalleryResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateGalleryDto,
    @CurrentUser("sub") userId: string,
    @CurrentUser("role") role: UserRole,
  ): Promise<GalleryResponseDto> {
    return this.updateGalleryService.execute(
      id,
      dto,
      userId,
      role,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete gallery',
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        message: 'Gallery image deleted successfully.',
      },
    },
  })
  async remove(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<{ message: string }> {
    return this.deleteGalleryService.execute(id, req.user.id, req.user.role);
  }
}
