import { Prisma } from '@/lib/prisma/client';
import { CommitteeMemberResponseDto } from '../dto/responses/committee-member-response.dto';

type CommitteeMemberWithAvatar =
    Prisma.CommitteeMemberGetPayload<{
        include: {
            avatar: {
                select: {
                    id: true;
                    url: true;
                };
            };
        };
    }>;

export class CommitteeMemberMapper {
    static toResponse(
        member: CommitteeMemberWithAvatar,
    ): CommitteeMemberResponseDto {
        return {
            id: member.id,

            name: member.name,
            designation: member.designation,

            phone: member.phone,
            email: member.email,

            avatar: member.avatar
                ? {
                      id: member.avatar.id,
                      url: member.avatar.url,
                  }
                : null,

            address: member.address,

            joiningDate: member.joiningDate,
            endDate: member.endDate,

            isActive: member.isActive,

            createdAt: member.createdAt,
            updatedAt: member.updatedAt,
        };
    }

    static toResponseList(
        members: CommitteeMemberWithAvatar[],
    ): CommitteeMemberResponseDto[] {
        return members.map((member) =>
            CommitteeMemberMapper.toResponse(member),
        );
    }
}