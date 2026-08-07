import { Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';

import { CloudinaryService } from '../../../common/cloudinary/cloudinary.service';
import { CloudinaryFolderType } from '../../../common/cloudinary/cloudinary.types';

@Injectable()
export class ReplaceImageService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async execute(
    publicId: string,
    filePath: string,
    folder: CloudinaryFolderType,
  ): Promise<UploadApiResponse> {
    return this.cloudinaryService.replace(publicId, filePath, folder);
  }
}
