import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class DonorHistoryQueryDto {
  @ApiProperty({
    example: '8a8e8d1b-2fd8-46c4-8e5d-2c92a8fef5ef',
  })
  @IsUUID()
  donorId!: string;

  @ApiProperty({
    required: false,
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page!: number;

  @ApiProperty({
    required: false,
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit!: number;
}