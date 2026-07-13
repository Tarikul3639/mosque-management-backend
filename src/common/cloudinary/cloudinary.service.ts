import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

import {
  CloudinaryFolderType,
  ResourceType,
  UploadOptions,
} from './cloudinary.types';

@Injectable()
export class CloudinaryService {
  private readonly rootFolder: string;

  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.getOrThrow<string>('cloudinary.cloudName'),
      api_key: this.configService.getOrThrow<string>('cloudinary.apiKey'),
      api_secret: this.configService.getOrThrow<string>('cloudinary.apiSecret'),
    });

    this.rootFolder = this.configService.getOrThrow<string>(
      'cloudinary.rootFolder',
    );
  }

  async upload(
    filePath: string,
    folder: CloudinaryFolderType,
    options: UploadOptions = {},
  ): Promise<UploadApiResponse> {
    const { resourceType = 'image', ...uploadOptions } = options;

    return cloudinary.uploader.upload(filePath, {
      folder: `${this.rootFolder}/${folder}`,
      resource_type: resourceType,
      ...uploadOptions,
    });
  }

  async delete(
    publicId: string,
    resourceType: ResourceType = 'image',
  ): Promise<void> {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  }

  async replace(
    publicId: string,
    filePath: string,
    folder: CloudinaryFolderType,
    options: UploadOptions = {},
  ): Promise<UploadApiResponse> {
    const { resourceType = 'image' } = options;

    await this.delete(publicId, resourceType);
    return this.upload(filePath, folder, options);
  }
}
