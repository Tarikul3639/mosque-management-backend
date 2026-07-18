import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    Transform,
    Type,
} from 'class-transformer';
import {
    IsBoolean,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';

import { CommitteeRole } from '@/lib/prisma/client';

export class CommitteeMemberQueryDto {
    @ApiPropertyOptional({
        example: 1,
        default: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @ApiPropertyOptional({
        example: 10,
        default: 10,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number;

    @ApiPropertyOptional({
        example: 'Karim',
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        enum: CommitteeRole,
        example: CommitteeRole.PRESIDENT,
    })
    @IsOptional()
    @IsEnum(CommitteeRole)
    designation?: CommitteeRole;

    @ApiPropertyOptional({
        example: true,
    })
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;

        return value;
    })
    @IsBoolean()
    isActive?: boolean;
}