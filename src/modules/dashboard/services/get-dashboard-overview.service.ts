import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { DashboardOverviewDto } from '../dto/responses/dashboard-overview.dto';
import { DashboardMapper } from '../mappers/dashboard.mapper';

@Injectable()
export class GetDashboardOverviewService {
    constructor(private readonly prisma: PrismaService) {}

    async execute(): Promise<DashboardOverviewDto> {
        const [
            totalFamilies,
            activeFamilies,

            totalDonors,
            activeDonors,

            totalCommitteeMembers,

            totalDonations,
            totalExpenses,

            runningProjects,
        ] = await Promise.all([
            this.prisma.family.count(),

            this.prisma.family.count({
                where: {
                    isActive: true,
                },
            }),

            this.prisma.donor.count(),

            this.prisma.donor.count({
                where: {
                    isActive: true,
                },
            }),

            this.prisma.committeeMember.count({
                where: {
                    isActive: true,
                },
            }),

            this.prisma.donation.aggregate({
                _sum: {
                    amount: true,
                },
            }),

            this.prisma.expense.aggregate({
                _sum: {
                    amount: true,
                },
            }),

            this.prisma.developmentProject.count({
                where: {
                    status: 'RUNNING',
                },
            }),
        ]);

        return DashboardMapper.toOverviewDto({
            totalFamilies,
            activeFamilies,

            totalDonors,
            activeDonors,

            totalCommitteeMembers,

            totalDonations:
                Number(totalDonations._sum.amount ?? 0),

            totalExpenses:
                Number(totalExpenses._sum.amount ?? 0),

            runningProjects,
        });
    }
}