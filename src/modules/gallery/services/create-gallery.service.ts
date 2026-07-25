import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { CreateGalleryDto } from '../dto/requests/create-gallery.dto';
import { GalleryResponseDto } from '../dto/responses/gallery-response.dto';
import { GalleryMapper } from '../mappers/gallery.mapper';

@Injectable()
export class CreateGalleryService {
  constructor(private readonly prisma: PrismaService) { }

  async execute(
    dto: CreateGalleryDto,
    userId: string,
  ): Promise<GalleryResponseDto> {
    const gallery = await this.prisma.gallery.create({
      data: {
        title: dto.title,
        description: dto.description,
        order: dto.order ?? 0,

        images: {
          connect: dto.imageIds.map((id) => ({
            id,
          })),
        },

        createdById: userId,
        updatedById: userId,
      },
      include: {
        images: {
          select: {
            id: true,
            url: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
        updatedBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return GalleryMapper.toResponse(gallery);
  }
}
