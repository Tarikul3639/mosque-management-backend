import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { GallerySummaryResponseDto } from '../dto/responses/gallery-summary-response.dto';

@Injectable()
export class GetGallerySummaryService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async execute(): Promise<GallerySummaryResponseDto> {
        const [totalImages, latestGallery] =
            await Promise.all([
                this.prisma.gallery.count(),

                this.prisma.gallery.findFirst({
                    orderBy: {
                        createdAt: 'desc',
                    },
                    select: {
                        createdAt: true,
                    },
                }),
            ]);

        return {
            totalImages,
            lastUploadedAt:
                latestGallery?.createdAt ?? null,
        };
    }
}