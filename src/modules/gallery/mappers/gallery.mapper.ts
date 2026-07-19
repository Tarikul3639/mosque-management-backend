import { Prisma } from '@/lib/prisma/client';

import { GalleryResponseDto } from '../dto/responses/gallery-response.dto';

type GalleryWithUsers = Prisma.GalleryGetPayload<{
  include: {
    images: {
      select: {
        id: true;
        url: true;
      };
    };
    createdBy: {
      select: {
        id: true;
        fullName: true;
      };
    };
    updatedBy: {
      select: {
        id: true;
        fullName: true;
      };
    };
  };
}>;

export class GalleryMapper {
  static toResponse(gallery: GalleryWithUsers): GalleryResponseDto {
    return {
      id: gallery.id,
      title: gallery.title,
      images: gallery.images.map((image) => ({
        id: image.id,
        url: image.url,
      })),
      description: gallery.description,
      order: gallery.order,
      createdBy: gallery.createdBy
        ? {
            id: gallery.createdBy.id,
            fullName: gallery.createdBy.fullName,
          }
        : null,
      updatedBy: gallery.updatedBy
        ? {
            id: gallery.updatedBy.id,
            fullName: gallery.updatedBy.fullName,
          }
        : null,
      createdAt: gallery.createdAt,
      updatedAt: gallery.updatedAt,
    };
  }

  static toResponseList(galleries: GalleryWithUsers[]): GalleryResponseDto[] {
    return galleries.map((gallery) => GalleryMapper.toResponse(gallery));
  }
}