import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { FAMILY_MESSAGES } from '../constants/family.constants';
import { FamilyResponseDto } from '../dto/responses/family-response.dto';

@Injectable()
export class GetFamilyService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async execute(
        id: string,
    ): Promise<FamilyResponseDto> {
        const family = await this.prisma.family.findUnique({
            where: {
                id,
            },
        });

        if (!family) {
            throw new NotFoundException(
                FAMILY_MESSAGES.NOT_FOUND,
            );
        }

        return {
            id: family.id,
            familyNo: family.familyNo,
            headName: family.headName,
            phone: family.phone,
            address: family.address,
            avatar: family.avatar,
            isActive: family.isActive,
            createdAt: family.createdAt,
            updatedAt: family.updatedAt,
        };
    }
}