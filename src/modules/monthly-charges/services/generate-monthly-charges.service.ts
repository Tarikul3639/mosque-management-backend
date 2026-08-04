import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { GenerateMonthlyChargesDto } from '../dto/requests/generate-monthly-charges.dto';
import { GenerateMonthlyChargesResponseDto } from '../dto/responses/generate-monthly-charges-response.dto';

@Injectable()
export class GenerateMonthlyChargesService {
  constructor(private readonly prismaService: PrismaService) { }

  async execute(
    dto: GenerateMonthlyChargesDto,
  ): Promise<GenerateMonthlyChargesResponseDto> {
    const families = await this.prismaService.family.findMany({
      where: {
        isActive: true,
      },
      include: {
        feeHistory: {
          where: {
            startDate: {
              lte: new Date(dto.year, dto.month - 1, 31),
            },
            OR: [
              {
                endDate: null,
              },
              {
                endDate: {
                  gte: new Date(dto.year, dto.month - 1, 1),
                },
              },
            ],
          },
          orderBy: {
            startDate: 'desc',
          },
          take: 1,
        },
      },
    });

    const totalFamilies = families.length;

    let generatedCharges = 0;
    let skippedCharges = 0;

    for (const family of families) {
      const fee = family.feeHistory[0];

      if (!fee) {
        skippedCharges++;
        continue;
      }

      const exists = await this.prismaService.monthlyCharge.findUnique({
        where: {
          familyId_year_month: {
            familyId: family.id,
            year: dto.year,
            month: dto.month,
          },
        },
      });

      if (exists) {
        skippedCharges++;
        continue;
      }

      await this.prismaService.monthlyCharge.create({
        data: {
          familyId: family.id,
          familyFeeId: fee.id,
          year: dto.year,
          month: dto.month,
          amount: fee.monthlyFee,
        },
      });

      generatedCharges++;
    }

    return {
      message: 'Monthly charges generated successfully.',
      totalFamilies,
      generatedCharges,
      skippedCharges,
      year: dto.year,
      month: dto.month,
    };
  }
}
