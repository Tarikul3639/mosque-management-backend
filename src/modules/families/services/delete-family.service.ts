import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { FAMILY_MESSAGES } from '../constants/family.constants';

@Injectable()
export class DeleteFamilyService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(id: string): Promise<{ message: string }> {
        return this.prisma.$transaction(async (tx) => {
            const family = await tx.family.findUnique({
                where: { id },
                select: {
                    id: true,
                    isActive: true,
                    _count: {
                        select: {
                            feeHistory: true,
                            charges: true,
                            payments: true,
                        },
                    },
                },
            });

            if (!family) {
                throw new NotFoundException(FAMILY_MESSAGES.NOT_FOUND);
            }

            const hasRelations =
                family._count.feeHistory > 0 ||
                family._count.charges > 0 ||
                family._count.payments > 0;

            // Permanently delete if the family has no related records
            if (!hasRelations) {
                await tx.family.delete({
                    where: { id },
                });

                return {
                    message: FAMILY_MESSAGES.HARD_DELETED,
                };
            }

            // Already inactive
            if (!family.isActive) {
                return {
                    message: FAMILY_MESSAGES.DEACTIVATED,
                };
            }

            // Soft delete
            await tx.family.update({
                where: { id },
                data: {
                    isActive: false,
                },
            });

            return {
                message: FAMILY_MESSAGES.DEACTIVATED,
            };
        });
    }
}