import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '@/common/cloudinary/cloudinary.service';
import { UPLOAD_MESSAGES } from '../constants/upload.constants';

@Injectable()
export class DeleteImageService {
    constructor(
        private readonly cloudinaryService: CloudinaryService,
    ) { }

    async execute(
        publicId: string,
    ): Promise<{ message: string }> {
        await this.cloudinaryService.delete(
            publicId,
        );

        return {
            message: UPLOAD_MESSAGES.IMAGE_DELETED,
        };
    }
}