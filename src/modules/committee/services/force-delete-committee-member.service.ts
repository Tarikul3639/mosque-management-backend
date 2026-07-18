import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/common/prisma/prisma.service";
import { COMMITTEE_MESSAGES } from "../constants/committee.constants";

@Injectable()
export class ForceDeleteCommitteeMemberService {
    constructor(private readonly prismaService: PrismaService) { }

    async execute(
        id: string
    ): Promise<void> {
        const member = await this.prismaService.committeeMember.findUnique({
            where: {
                id,
            }
        })

        if (!member) {
            throw new NotFoundException(COMMITTEE_MESSAGES.NOT_FOUND)
        }

        await this.prismaService.committeeMember.delete({
            where: {
                id,
            }
        })
    }
}