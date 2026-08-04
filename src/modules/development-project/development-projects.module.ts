import { Module } from '@nestjs/common';
import { PrismaModule } from '@/common/prisma/prisma.module';

import { DevelopmentProjectsController } from './controllers/development-projects.controller';

import { CreateDevelopmentProjectService } from './services/create-development-project.service';
import { DeleteDevelopmentProjectService } from './services/delete-development-project.service';
import { GetDevelopmentProjectService } from './services/get-development-project.service';
import { GetDevelopmentProjectSummaryService } from './services/get-development-project-summary.service';
import { ListDevelopmentProjectsService } from './services/list-development-projects.service';
import { UpdateDevelopmentProjectService } from './services/update-development-project.service';

@Module({
  imports: [PrismaModule],
  controllers: [DevelopmentProjectsController],

  providers: [
    CreateDevelopmentProjectService,
    UpdateDevelopmentProjectService,
    DeleteDevelopmentProjectService,
    GetDevelopmentProjectService,
    ListDevelopmentProjectsService,
    GetDevelopmentProjectSummaryService,
  ],

  exports: [
    CreateDevelopmentProjectService,
    UpdateDevelopmentProjectService,
    DeleteDevelopmentProjectService,
    GetDevelopmentProjectService,
    ListDevelopmentProjectsService,
    GetDevelopmentProjectSummaryService,
  ],
})
export class DevelopmentProjectsModule {}
