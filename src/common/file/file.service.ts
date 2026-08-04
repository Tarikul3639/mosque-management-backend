import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { CloudinaryService } from '@/common/cloudinary/cloudinary.service';

@Injectable()
export class FileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async deleteById(fileId?: string | null): Promise<void> {
    if (!fileId) return;

    const file = await this.prisma.file.findUnique({
      where: {
        id: fileId,
      },
    });

    if (!file) return;

    await this.cloudinary.delete(file.publicId);

    await this.prisma.file.delete({
      where: {
        id: file.id,
      },
    });
  }

  async replace(
    oldFileId?: string | null,
    newFileId?: string | null,
  ): Promise<void> {
    if (!oldFileId) return;

    if (oldFileId === newFileId) {
      return;
    }

    await this.deleteById(oldFileId);
  }
}
