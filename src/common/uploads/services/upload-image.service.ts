import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { CloudinaryService } from '@/common/cloudinary/cloudinary.service';
import { CloudinaryFolderType } from '@/common/cloudinary/cloudinary.types';

import { UploadResponseDto } from '../dto/responses/upload-response.dto';

@Injectable()
export class UploadImageService {
    constructor(private readonly cloudinaryService: CloudinaryService) { }

    async execute(
        filePath: string,
        folder: CloudinaryFolderType,
    ): Promise<UploadResponseDto> {
        const result = await this.cloudinaryService.upload(filePath, folder);

        if (!result.secure_url) {
            throw new InternalServerErrorException('Image upload failed.');
        }

        return {
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
            originalFilename: result.original_filename,
        };
    }
}
