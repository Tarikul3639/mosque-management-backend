import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { FAMILY_FEE_MESSAGES } from '../constants/family.constants';
import { FamilyFeeResponseDto } from '../dto/responses/family-fee-response.dto';

@Injectable()
export class GetCurrentFamilyFeeService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(familyId: string): Promise<FamilyFeeResponseDto> {
    const fee = await this.prisma.familyFee.findFirst({
      where: {
        familyId,
        endDate: null,
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    if (!fee) {
      throw new NotFoundException(FAMILY_FEE_MESSAGES.NOT_FOUND);
    }

    return {
      id: fee.id,
      familyId: fee.familyId,
      monthlyFee: Number(fee.monthlyFee),
      startDate: fee.startDate,
      endDate: fee.endDate,
      createdAt: fee.createdAt,
    };
  }
}
