import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class DashboardOverviewQueryDto {
    @ApiPropertyOptional({
        example: '2026-07-01',
        description: 'Start date',
    })
    @IsOptional()
    @IsDateString()
    from?: string;

    @ApiPropertyOptional({
        example: '2026-07-31',
        description: 'End date',
    })
    @IsOptional()
    @IsDateString()
    to?: string;
}