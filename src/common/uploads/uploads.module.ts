import { Module } from '@nestjs/common';

import { PrismaModule } from '@/common/prisma/prisma.module';
import { CloudinaryModule } from '@/common/cloudinary/cloudinary.module';

import { UploadsController } from './controllers/uploads.controller';

import { UploadImageService } from './services/upload-image.service';
import { DeleteImageService } from './services/delete-image.service';
import { ReplaceImageService } from './services/replace-image.service';
import { CreateUploadSignatureService } from './services/create-upload-signature.service';
import { CreateFileService } from './services/create-file.service';

@Module({
    imports: [
        PrismaModule,
        CloudinaryModule,
    ],

    controllers: [
        UploadsController,
    ],

    providers: [
        UploadImageService,
        DeleteImageService,
        ReplaceImageService,
        CreateFileService,
        CreateUploadSignatureService,
    ],

    exports: [
        UploadImageService,
        DeleteImageService,
        ReplaceImageService,
        CreateUploadSignatureService,
    ],
})
export class UploadsModule { }