import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import {
  GALLERY_DEFAULT_LIMIT,
  GALLERY_DEFAULT_PAGE,
} from '../constants/gallery.constants';
import { GalleryQueryDto } from '../dto/requests/gallery-query.dto';
import { GalleryListResponseDto } from '../dto/responses/gallery-list-response.dto';
import { GalleryMapper } from '../mappers/gallery.mapper';

@Injectable()
export class ListGalleriesService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GalleryQueryDto): Promise<GalleryListResponseDto> {
    const page = query.page ?? GALLERY_DEFAULT_PAGE;

    const limit = query.limit ?? GALLERY_DEFAULT_LIMIT;

    const skip = (page - 1) * limit;

    const where = {
      ...(query.search && {
        OR: [
          {
            title: {
              contains: query.search,
              mode: 'insensitive' as const,
            },
          },
          {
            description: {
              contains: query.search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),
    };

    const [galleries, total] = await Promise.all([
      this.prisma.gallery.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          {
            order: 'asc',
          },
          {
            createdAt: 'desc',
          },
        ],
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
      }),

      this.prisma.gallery.count({
        where,
      }),
    ]);

    return {
      data: GalleryMapper.toResponseList(galleries),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
