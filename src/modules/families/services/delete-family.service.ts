import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "@/common/prisma/prisma.service";
import { FileService } from "@/common/file/file.service";

import { FAMILY_MESSAGES } from "../constants/family.constants";

@Injectable()
export class DeleteFamilyService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly fileService: FileService,
    ) { }

    async execute(id: string): Promise<{ message: string }> {
        const family = await this.prisma.family.findUnique({
            where: { id },
            select: {
                id: true,
                avatarId: true,
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

        // Hard delete
        if (!hasRelations) {
            await this.prisma.family.delete({
                where: { id },
            });

            await this.fileService.deleteById(
                family.avatarId,
            );

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
        await this.prisma.family.update({
            where: { id },
            data: {
                isActive: false,
            },
        });

        return {
            message: FAMILY_MESSAGES.DEACTIVATED,
        };
    }
}