import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { MONTHLY_CHARGE_MESSAGES } from '../constants/family.constants';

@Injectable()
export class DeleteMonthlyChargeService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async execute(
        id: string,
    ): Promise<{ message: string }> {
        const charge = await this.prisma.monthlyCharge.findUnique({
            where: {
                id,
            },
        });

        if (!charge) {
            throw new NotFoundException(
                MONTHLY_CHARGE_MESSAGES.NOT_FOUND,
            );
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