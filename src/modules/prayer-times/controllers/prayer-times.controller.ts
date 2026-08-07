import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
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

import { UpdatePrayerTimeDto } from '../dto/requests/update-prayer-time.dto';
import { PrayerTimeResponseDto } from '../dto/responses/prayer-time-response.dto';

import { GetPrayerTimeService } from '../services/get-prayer-time.service';
import { UpdatePrayerTimeService } from '../services/update-prayer-time.service';

@ApiTags('Prayer Times')
@Controller('prayer-times')
export class PrayerTimesController {
  constructor(
    private readonly getPrayerTimeService: GetPrayerTimeService,
    private readonly updatePrayerTimeService: UpdatePrayerTimeService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get prayer times',
  })
  @ApiResponse({
    status: 200,
    type: PrayerTimeResponseDto,
  })
  async getPrayerTime(): Promise<PrayerTimeResponseDto> {
    return this.getPrayerTimeService.execute();
  }

  @Put()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update prayer times',
  })
  @ApiResponse({
    status: 200,
    type: PrayerTimeResponseDto,
  })
  async updatePrayerTime(
    @Body() dto: UpdatePrayerTimeDto,
    @Req() _req: any,
  ): Promise<PrayerTimeResponseDto> {
    return this.updatePrayerTimeService.execute(dto);
  }
}
