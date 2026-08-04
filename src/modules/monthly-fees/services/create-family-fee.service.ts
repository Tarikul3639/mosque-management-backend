import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { CreateFamilyFeeDto } from '../dto/requests/create-family-fee.dto';
import { FamilyFeeResponseDto } from '../dto/responses/family-fee-response.dto';

@Injectable()
export class CreateFamilyFeeService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    familyId: string,
    dto: CreateFamilyFeeDto,
  ): Promise<FamilyFeeResponseDto> {
    const family = await this.prisma.family.findUnique({
      where: {
        id: familyId,
      },
    });

    if (!family) {
      throw new NotFoundException('Family not found.');
    }

    const activeFee = await this.prisma.familyFee.findFirst({
      where: {
        familyId,
        endDate: null,
      },
    });

    if (activeFee) {
      throw new ConflictException(
        'An active monthly fee already exists for this family.',
      );
    }

    const fee = await this.prisma.familyFee.create({
      data: {
        familyId,
        monthlyFee: dto.monthlyFee,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
      },
    });

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
