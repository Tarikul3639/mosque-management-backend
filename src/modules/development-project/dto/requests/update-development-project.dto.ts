import { PartialType } from '@nestjs/swagger';
import { CreateDevelopmentProjectDto } from './create-development-project.dto';

export class UpdateDevelopmentProjectDto extends PartialType(
  CreateDevelopmentProjectDto,
) {}