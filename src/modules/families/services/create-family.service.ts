import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { FAMILY_MESSAGES } from '../constants/family.constants';

import { CreateFamilyDto } from '../dto/requests/create-family.dto';
import { FamilyResponseDto } from '../dto/responses/family-response.dto';

@Injectable()
export class CreateFamilyService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(dto: CreateFamilyDto): Promise<FamilyResponseDto> {
        const existingFamily = await this.prisma.family.findFirst({
            where: {
                OR: [
                    {
                        familyNo: dto.familyNo,
                    },
                    ...(dto.phone
                        ? [
                            {
                                phone: dto.phone,
                            },
                        ]
                        : []),
                ],
            },
        });

        if (existingFamily) {
            if (existingFamily.familyNo === dto.familyNo) {
                throw new ConflictException(FAMILY_MESSAGES.ALREADY_EXISTS);
            }

            if (dto.phone && existingFamily.phone === dto.phone) {
                throw new ConflictException(FAMILY_MESSAGES.PHONE_EXISTS);
            }
        }

        const family = await this.prisma.family.create({
            data: {
                familyNo: dto.familyNo,
                headName: dto.headName,
                phone: dto.phone,
                address: dto.address,
                isActive: dto.isActive ?? true,

                ...(dto.avatarId && {
                    avatar: {
                        connect: {
                            id: dto.avatarId,
                        },
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

        return {
            id: family.id,
            familyNo: family.familyNo,
            headName: family.headName,
            phone: family.phone,
            address: family.address,

            avatar: family.avatar
                ? {
                    id: family.avatar.id,
                    url: family.avatar.url,
                }
                : null,

            isActive: family.isActive,
            createdAt: family.createdAt,
            updatedAt: family.updatedAt,
        };
    }
}
