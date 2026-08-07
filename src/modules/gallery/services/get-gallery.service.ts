import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../common/prisma/prisma.service';

import { GALLERY_MESSAGES } from '../constants/gallery.constants';
import { GalleryResponseDto } from '../dto/responses/gallery-response.dto';
import { GalleryMapper } from '../mappers/gallery.mapper';

@Injectable()
export class GetGalleryService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(galleryId: string): Promise<GalleryResponseDto> {
    const gallery = await this.prisma.gallery.findUnique({
      where: {
        id: galleryId,
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

    if (!gallery) {
      throw new NotFoundException(GALLERY_MESSAGES.NOT_FOUND);
    }

    return GalleryMapper.toResponse(gallery);
  }
}
