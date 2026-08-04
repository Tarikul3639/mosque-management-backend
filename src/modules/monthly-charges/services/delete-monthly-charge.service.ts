import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { MONTHLY_CHARGE_MESSAGES } from '../constants/family.constants';

@Injectable()
export class DeleteMonthlyChargeService {
  constructor(private readonly prisma: PrismaService) { }

  async execute(id: string): Promise<{ message: string }> {
    const charge = await this.prisma.monthlyCharge.findUnique({
      where: {
        id,
      },
      include: {
        payments: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!charge) {
      throw new NotFoundException(MONTHLY_CHARGE_MESSAGES.NOT_FOUND);
    }

    if (charge.payments.length > 0) {
      throw new BadRequestException(MONTHLY_CHARGE_MESSAGES.HAS_PAYMENTS);
    }

    await this.prisma.monthlyCharge.delete({
      where: {
        id,
      },
    });

    return {
      message: MONTHLY_CHARGE_MESSAGES.DELETED,
    };
  }
}
