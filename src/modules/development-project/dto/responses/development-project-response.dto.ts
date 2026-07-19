import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { ProjectStatus } from '@/lib/prisma/client';

class DevelopmentProjectUserDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  fullName!: string;
}

export class DevelopmentProjectResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiPropertyOptional()
  description!: string | null;

  @ApiProperty()
  budget!: string;

  @ApiProperty()
  spent!: string;

  @ApiProperty()
  progress!: number;

  @ApiProperty({
    enum: ProjectStatus,
  })
  status!: ProjectStatus;

  @ApiPropertyOptional()
  image!: string | null;

  @ApiPropertyOptional()
  startDate?: Date | null;

  @ApiPropertyOptional()
  endDate!: Date | null;

  @ApiProperty({
    type: DevelopmentProjectUserDto,
    nullable: true,
  })
  createdBy!: DevelopmentProjectUserDto | null;

  @ApiProperty({
    type: DevelopmentProjectUserDto,
    nullable: true,
  })
  updatedBy!: DevelopmentProjectUserDto | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}