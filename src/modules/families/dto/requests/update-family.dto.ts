import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

import { CreateFamilyDto } from './create-family.dto';

export class UpdateFamilyDto extends PartialType(CreateFamilyDto) {
  @ApiPropertyOptional({
    example: 'F-0050',
    description: 'Family number',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  familyNo?: string;
}
