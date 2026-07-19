import { ApiProperty } from '@nestjs/swagger';

export class DashboardOverviewDto {
    @ApiProperty({
        example: 250,
        description: 'Total number of registered families.',
    })
    totalFamilies!: number;

    @ApiProperty({
        example: 240,
        description: 'Total number of active families.',
    })
    activeFamilies!: number;

    @ApiProperty({
        example: 120,
        description: 'Total number of registered donors.',
    })
    totalDonors!: number;

    @ApiProperty({
        example: 105,
        description: 'Total number of active donors.',
    })
    activeDonors!: number;

    @ApiProperty({
        example: 12,
        description: 'Total number of committee members.',
    })
    totalCommitteeMembers!: number;

    @ApiProperty({
        example: 850000,
        description: 'Total donation amount.',
    })
    totalDonations!: number;

    @ApiProperty({
        example: 420000,
        description: 'Total expense amount.',
    })
    totalExpenses!: number;

    @ApiProperty({
        example: 3,
        description: 'Total number of running development projects.',
    })
    runningProjects!: number;
}