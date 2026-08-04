import { Module } from '@nestjs/common';

import { PrismaModule } from '@/common/prisma/prisma.module';
import { GalleriesController } from './controllers/galleries.controller';

import { CreateGalleryService } from './services/create-gallery.service';
import { DeleteGalleryService } from './services/delete-gallery.service';
import { GetGalleryService } from './services/get-gallery.service';
import { GetGallerySummaryService } from './services/get-gallery-summary.service';
import { ListGalleriesService } from './services/list-galleries.service';
import { UpdateGalleryService } from './services/update-gallery.service';

@Module({
  imports: [PrismaModule],

  controllers: [GalleriesController],

  providers: [
    CreateGalleryService,
    UpdateGalleryService,
    DeleteGalleryService,
    GetGalleryService,
    ListGalleriesService,
    GetGallerySummaryService,
  ],

  exports: [
    CreateGalleryService,
    UpdateGalleryService,
    DeleteGalleryService,
    GetGalleryService,
    ListGalleriesService,
    GetGallerySummaryService,
  ],
})
export class GalleriesModule {}
