import { CommitteeMember } from "@/lib/prisma/client";
import { CommitteeMemberResponseDto } from "../dto/responses/committee-member-response.dto";

export class CommitteeMemberMapper {
    static toResponse(
        member: CommitteeMember,
    ): CommitteeMemberResponseDto {
        return {
            id: member.id,

            fullName: member.fullName,
            designation: member.designation,

            phone: member.phone,
            email: member.email,

            avatar: member.avatar,
            address: member.address,

            joiningDate: member.joiningDate,
            endDate: member.endDate,

            isActive: member.isActive,

            createdAt: member.createdAt,
            updatedAt: member.updatedAt,
        };
    }


    //List
    static toResponseList(
        members: CommitteeMember[],
    ): CommitteeMemberResponseDto[] {
        return members.map((member) =>
            CommitteeMemberMapper.toResponse(member)
        )
    }
}