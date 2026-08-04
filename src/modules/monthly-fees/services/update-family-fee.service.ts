import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { FAMILY_FEE_MESSAGES } from '../constants/family.constants';

import { UpdateFamilyFeeDto } from '../dto/requests/update-family-fee.dto';
import { FamilyFeeResponseDto } from '../dto/responses/family-fee-response.dto';

@Injectable()
export class UpdateFamilyFeeService {
  constructor(private readonly prisma: PrismaService) { }

  async execute(
    id: string,
    dto: UpdateFamilyFeeDto,
  ): Promise<FamilyFeeResponseDto> {
    const fee = await this.prisma.familyFee.findUnique({
      where: {
        id,
      },
    });

    if (!fee) {
      throw new NotFoundException(FAMILY_FEE_MESSAGES.NOT_FOUND);
    }

    const hasMonthlyCharges = await this.prisma.monthlyCharge.count({
      where: {
        familyFeeId: id,
      },
    });

    if (hasMonthlyCharges > 0) {
      throw new BadRequestException(FAMILY_FEE_MESSAGES.CANNOT_UPDATE_USED_FEE);
    }

    const updatedFee = await this.prisma.familyFee.update({
      where: {
        id,
      },
      data: {
        ...(dto.monthlyFee !== undefined && {
          monthlyFee: dto.monthlyFee,
        }),

        ...(dto.startDate && {
          startDate: new Date(dto.startDate),
        }),

        ...(dto.endDate !== undefined && {
          endDate: dto.endDate ? new Date(dto.endDate) : null,
        }),
      },
    });

    return {
      id: updatedFee.id,

      familyId: updatedFee.familyId,

      monthlyFee: Number(updatedFee.monthlyFee),

      startDate: updatedFee.startDate,

      endDate: updatedFee.endDate,

      createdAt: updatedFee.createdAt,
    };
  }
}
