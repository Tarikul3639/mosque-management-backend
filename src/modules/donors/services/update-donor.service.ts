import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { DONOR_MESSAGES } from '../constants/donor.constants';
import { DonorMapper } from '../mappers/donor.mapper';

import { UpdateDonorDto } from '../dto/requests/update-donor.dto';
import { DonorResponseDto } from '../dto/responses/donor-response.dto';

@Injectable()
export class UpdateDonorService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async execute(
        id: string,
        dto: UpdateDonorDto,
    ): Promise<DonorResponseDto> {
        const donor = await this.prisma.donor.findUnique({
            where: {
                id,
            },
        });

        if (!donor) {
            throw new NotFoundException(
                DONOR_MESSAGES.DONOR_NOT_FOUND,
            );
        }

        const existingDonor = await this.prisma.donor.findFirst({
            where: {
                fullName: dto.fullName,
                phone: dto.phone,
                NOT: {
                    id,
                },
            },
        });

        if (existingDonor) {
            throw new ConflictException(
                DONOR_MESSAGES.DONOR_ALREADY_EXISTS,
            );
        }

        const updatedDonor = await this.prisma.donor.update({
            where: {
                id,
            },
            data: {
                fullName: dto.fullName,
                phone: dto.phone,
                email: dto.email,
                address: dto.address,
                isActive: dto.isActive,

                ...(dto.avatarId !== undefined && {
                    avatar: dto.avatarId
                        ? {
                            connect: {
                                id: dto.avatarId,
                            },
                        }
                        : {
                            disconnect: true,
                        },
                }),
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

        return DonorMapper.toResponse(updatedDonor);
    }
}