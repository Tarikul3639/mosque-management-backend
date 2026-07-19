import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { CreateGalleryDto } from '../dto/requests/create-gallery.dto';
import { GalleryResponseDto } from '../dto/responses/gallery-response.dto';
import { GalleryMapper } from '../mappers/gallery.mapper';

@Injectable()
export class CreateGalleryService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute(
    dto: CreateGalleryDto,
    userId: string,
  ): Promise<GalleryResponseDto> {
    const gallery =
      await this.prisma.gallery.create({
        data: {
          title: dto.title,
          imageUrl: dto.imageUrl,
          description: dto.description,
          order: dto.order ?? 0,

          createdById: userId,
          updatedById: userId,
        },
        include: {
          createdBy: {
            select: {
              id: true,
              fullName: true,
            },
          },
          updatedBy: {
            select: {
              id: true,
              fullName: true,
            },
          },
        },
      });

    return GalleryMapper.toResponse(
      gallery,
    );
  }
}