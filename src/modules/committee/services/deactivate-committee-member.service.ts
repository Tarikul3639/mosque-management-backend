import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { COMMITTEE_MESSAGES } from '../constants/committee.constants';

@Injectable()
export class DeactivateCommitteeMemberService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async execute(id: string): Promise<void> {
        const member =
            await this.prisma.committeeMember.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    isActive: true,
                },
            });

        if (!member) {
            throw new NotFoundException(
                COMMITTEE_MESSAGES.NOT_FOUND,
            );
        }

        if (!member.isActive) {
            return;
        }

        await this.prisma.committeeMember.update({
            where: {
                id,
            },
            data: {
                isActive: false,
            },
        });
    }
}