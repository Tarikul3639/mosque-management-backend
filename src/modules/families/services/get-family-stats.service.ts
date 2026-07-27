import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { FamilyStatsDto } from '../dto/responses/family-stats.dto';

@Injectable()
export class GetFamilyStatsService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async execute(): Promise<FamilyStatsDto> {
        const [
            totalFamilies,
            activeFamilies,
            inactiveFamilies,
            newFamiliesThisMonth,
        ] = await Promise.all([
            this.prisma.family.count(),

            this.prisma.family.count({
                where: {
                    isActive: true,
                },
            }),

            this.prisma.family.count({
                where: {
                    isActive: false,
                },
            }),

            this.prisma.family.count({
                where: {
                    createdAt: {
                        gte: new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            1,
                        ),
                    },
                },
            }),
        ]);

        return {
            totalFamilies,
            activeFamilies,
            inactiveFamilies,
            newFamiliesThisMonth,
        };
    }
}