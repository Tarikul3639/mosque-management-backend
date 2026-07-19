import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class FinancialSummaryQueryDto {
    @ApiPropertyOptional({
        example: '2026-01-01',
    })
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @ApiPropertyOptional({
        example: '2026-12-31',
    })
    @IsOptional()
    @IsDateString()
    endDate?: string;
}