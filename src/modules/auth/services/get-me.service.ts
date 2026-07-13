import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CurrentUserDto } from '../dto/responses/current-user.dto';

@Injectable()
export class GetMeService {
    constructor(private readonly prismaService: PrismaService) { }

    async execute(userId: string): Promise<CurrentUserDto> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
                avatar: true,
                role: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        const userDto: CurrentUserDto = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            avatar: user.avatar,
            role: user.role.name,
        };

        return userDto;
    }
}

