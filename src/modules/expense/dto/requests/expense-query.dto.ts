import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEnum,
    IsInt,
    IsOptional,
    IsPositive,
    IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ExpenseCategory } from '@/lib/prisma/client';

export class ExpenseQueryDto {
    @ApiPropertyOptional({
        example: 1,
        default: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    page?: number;

    @ApiPropertyOptional({
        example: 10,
        default: 10,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    limit?: number;

    @ApiPropertyOptional({
        example: 'Electricity',
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        enum: ExpenseCategory,
    })
    @IsOptional()
    @IsEnum(ExpenseCategory)
    category?: ExpenseCategory;
}