import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { CloudinaryService } from '@/common/cloudinary/cloudinary.service';

import { DONOR_MESSAGES } from '../constants/donor.constants';

@Injectable()
export class DeleteDonorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) { }

  async execute(id: string): Promise<{ message: string }> {
    const donor = await this.prisma.donor.findUnique({
      where: { id },
      include: {
        avatar: true,
        _count: {
          select: {
            donations: true,
          },
        },
      },
    });

    if (!donor) {
      throw new NotFoundException(DONOR_MESSAGES.DONOR_NOT_FOUND);
    }

    if (donor._count.donations > 0) {
      throw new ConflictException(DONOR_MESSAGES.DONOR_HAS_DONATIONS);
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.donor.delete({
        where: { id },
      });

      if (donor.avatar) {
        await tx.file.delete({
          where: {
            id: donor.avatar.id,
          },
        });
      }
    });

    if (donor.avatar?.publicId) {
      await this.cloudinary.delete(donor.avatar.publicId);
    }

    return {
      message: DONOR_MESSAGES.DONOR_DELETED,
    };
  }
}
