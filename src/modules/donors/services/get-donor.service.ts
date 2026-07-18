import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { DonorMapper } from '../mappers/donor.mapper';
import { DONOR_MESSAGES } from '../constants/donor.constants';
import { DonorResponseDto } from '../dto/responses/donor-response.dto';

@Injectable()
export class GetDonorService {
    constructor(private readonly prismaService: PrismaService) { }

    async execute(id: string): Promise<DonorResponseDto> {
        const donor = await this.prismaService.donor.findUnique({
            where: {
                id,
            },
        });

        if (!donor) {
            throw new NotFoundException(DONOR_MESSAGES.DONOR_NOT_FOUND);
        }

        return DonorMapper.toResponse(donor);
    }
}
