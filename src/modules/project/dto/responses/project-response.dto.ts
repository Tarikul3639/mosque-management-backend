import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ProjectStatus } from '../../../../lib/prisma/client';

class ProjectUserDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}

class ProjectImageDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  url!: string;
}

export class ProjectResponseDto {
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

  @ApiPropertyOptional({
    type: ProjectImageDto,
    nullable: true,
  })
  images!: ProjectImageDto[] | null;

  @ApiPropertyOptional()
  startDate!: Date | null;

  @ApiPropertyOptional()
  endDate!: Date | null;

  @ApiProperty({
    type: ProjectUserDto,
    nullable: true,
  })
  createdBy!: ProjectUserDto | null;

  @ApiProperty({
    type: ProjectUserDto,
    nullable: true,
  })
  updatedBy!: ProjectUserDto | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
