import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../common/prisma/prisma.service'; // Adjust your prisma service path

@Injectable()
export class DeleteUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<{ message: string }> {
    // 1. Find user and count all related foreign key dependencies across the schema
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            createdCommitteeMembers: true,
            updatedCommitteeMembers: true,
            createdProjects: true,
            updatedProjects: true,
            createdDonations: true,
            updatedDonations: true,
            createdDonors: true,
            updatedDonors: true,
            createdExpenses: true,
            updatedExpenses: true,
            createdFamilies: true,
            updatedFamilies: true,
            createdFamilyFees: true,
            updatedFamilyFees: true,
            createdFiles: true,
            updatedFiles: true,
            uploadedFiles: true,
            createdGalleries: true,
            updatedGalleries: true,
            createdMonthlyCharges: true,
            updatedMonthlyCharges: true,
            createdPayments: true,
            updatedPayments: true,
            createdPrayerTimes: true,
            updatedPrayerTimes: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    // 2. Aggregate total relations
    const totalRelations = Object.values(user._count).reduce(
      (acc, count) => acc + count,
      0,
    );

    // 3. Prevent deletion if any relationship exists
    if (totalRelations > 0) {
      throw new BadRequestException(
        'Cannot delete this user because they have active relations (e.g., created records, uploaded files, or logs) attached to them. Consider marking them as INACTIVE instead.',
      );
    }

    // 4. Safe to delete
    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'User successfully deleted.' };
  }
}
