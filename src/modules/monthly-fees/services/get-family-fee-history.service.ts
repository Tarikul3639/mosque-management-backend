import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { FAMILY_FEE_MESSAGES } from '../constants/family.constants';
import { FamilyFeeResponseDto } from '../dto/responses/family-fee-response.dto';

@Injectable()
export class GetFamilyFeeHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(familyId: string): Promise<FamilyFeeResponseDto[]> {
    const fees = await this.prisma.familyFee.findMany({
      where: {
        familyId,
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    if (fees.length === 0) {
      throw new NotFoundException(FAMILY_FEE_MESSAGES.NOT_FOUND);
    }

    return fees.map((fee) => ({
      id: fee.id,
      familyId: fee.familyId,
      monthlyFee: Number(fee.monthlyFee),
      startDate: fee.startDate,
      endDate: fee.endDate,
      createdAt: fee.createdAt,
    }));
  }
}
