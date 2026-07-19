import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { DevelopmentProjectMapper } from '../mappers/development-project.mapper'
import { CreateDevelopmentProjectDto } from '../dto/requests/create-development-project.dto';
import { DevelopmentProjectResponseDto } from '../dto/responses/development-project-response.dto';

@Injectable()
export class CreateDevelopmentProjectService {
    constructor(private readonly prismaService: PrismaService) { }

    async execute(
        dto: CreateDevelopmentProjectDto,
        userId: string,
    ): Promise<DevelopmentProjectResponseDto> {
        const project = await this.prismaService.developmentProject.create({
            data: {
                title: dto.title,
                description: dto.description,
                budget: dto.budget,
                spent: dto.spent ?? 0,
                progress: 0,
                status: dto.status,
                image: dto.image,
                startDate: new Date(dto.startDate),
                endDate: dto.endDate
                    ? new Date(dto.endDate)
                    : null,

                createdById: userId,
                updatedById: userId,
            },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        fullName: true
                    }
                },
                updatedBy: {
                    select: {
                        id: true,
                        fullName: true
                    }
                }
            }
        })

        return DevelopmentProjectMapper.toResponse(project)
    }
}