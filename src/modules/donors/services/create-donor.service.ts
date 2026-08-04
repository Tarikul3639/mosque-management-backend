import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { DONOR_MESSAGES } from '../constants/donor.constants';

import { CreateDonorDto } from '../dto/requests/create-donor.dto';
import { DonorResponseDto } from '../dto/responses/donor-response.dto';
import { DonorMapper } from '../mappers/donor.mapper';

@Injectable()
export class CreateDonorService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(dto: CreateDonorDto): Promise<DonorResponseDto> {
    const existingDonor = await this.prisma.donor.findFirst({
      where: {
        name: dto.name,
        phone: dto.phone,
      },
    });

    if (existingDonor) {
      throw new ConflictException(DONOR_MESSAGES.DONOR_ALREADY_EXISTS);
    }

    const donor = await this.prisma.donor.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        address: dto.address,
        isActive: dto.isActive,
        avatar: dto.avatarId
          ? {
              connect: {
                id: dto.avatarId,
              },
            }
          : undefined,
      },

      include: {
        avatar: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    return DonorMapper.toResponse(donor);
  }
}
