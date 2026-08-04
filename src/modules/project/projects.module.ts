import { Module } from '@nestjs/common';
import { PrismaModule } from '@/common/prisma/prisma.module';

import { ProjectsController } from './controllers/projects.controller';

import { CreateProjectService } from './services/create-project.service';
import { DeleteProjectService } from './services/delete-project.service';
import { GetProjectService } from './services/get-project.service';
import { GetProjectSummaryService } from './services/get-project-summary.service';
import { ListProjectsService } from './services/list-projects.service';
import { UpdateProjectService } from './services/update-project.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],

  providers: [
    CreateProjectService,
    UpdateProjectService,
    DeleteProjectService,
    GetProjectService,
    ListProjectsService,
    GetProjectSummaryService,
  ],

  exports: [
    CreateProjectService,
    UpdateProjectService,
    DeleteProjectService,
    GetProjectService,
    ListProjectsService,
    GetProjectSummaryService,
  ],
})
export class ProjectsModule {}
