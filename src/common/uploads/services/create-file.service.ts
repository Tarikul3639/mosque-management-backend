import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../common/prisma/prisma.service';

import { CreateFileDto } from '../dto/requests/create-file.dto';
import { FileResponseDto } from '../dto/responses/file-response.dto';

@Injectable()
export class CreateFileService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    dto: CreateFileDto,
    uploadedById?: string,
  ): Promise<FileResponseDto> {
    const existing = await this.prisma.file.findUnique({
      where: {
        publicId: dto.publicId,
      },
    });

    if (existing) {
      return {
        id: existing.id,
        url: existing.url,
        publicId: existing.publicId,
        originalName: existing.originalName ?? undefined,
        mimeType: existing.mimeType ?? undefined,
        format: existing.extension ?? undefined,
        size: existing.size,
        width: existing.width ?? undefined,
        height: existing.height ?? undefined,
        createdAt: existing.createdAt,
      };
    }

    const file = await this.prisma.file.create({
      data: {
        url: dto.url,
        publicId: dto.publicId,
        originalName: dto.originalName,
        mimeType: dto.mimeType,
        extension: dto.format,
        size: dto.size,
        width: dto.width,
        height: dto.height,
        uploadedById,
      },
    });

    return {
      id: file.id,
      url: file.url,
      publicId: file.publicId,
      originalName: file.originalName ?? undefined,
      mimeType: file.mimeType ?? undefined,
      format: file.extension ?? undefined,
      size: file.size,
      width: file.width ?? undefined,
      height: file.height ?? undefined,
      createdAt: file.createdAt,
    };
  }
}
