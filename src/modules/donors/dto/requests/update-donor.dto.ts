import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';

import { IsBoolean, IsOptional } from 'class-validator';

import { CreateDonorDto } from './create-donor.dto';

export class UpdateDonorDto extends PartialType(CreateDonorDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
