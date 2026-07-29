import {
    Injectable,
    NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "@/common/prisma/prisma.service";
import { FileService } from "@/common/file/file.service";

import { COMMITTEE_MESSAGES } from "../constants/committee.constants";

@Injectable()
export class ForceDeleteCommitteeMemberService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly fileService: FileService,
    ) { }

    async execute(id: string): Promise<void> {
        const member =
            await this.prisma.committeeMember.findUnique({
                where: {
                    id,
                },
            });

        if (!member) {
            throw new NotFoundException(
                COMMITTEE_MESSAGES.NOT_FOUND,
            );
        }

        await this.prisma.committeeMember.delete({
            where: {
                id,
            },
        });

        await this.fileService.deleteById(
            member.avatarId,
        );
    }
}