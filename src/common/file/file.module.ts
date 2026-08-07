import { Global, Module } from '@nestjs/common';

import { PrismaModule } from '../../common/prisma/prisma.module';
import { CloudinaryModule } from '../../common/cloudinary/cloudinary.module';

import { FileService } from './file.service';

@Global()
@Module({
  imports: [PrismaModule, CloudinaryModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
