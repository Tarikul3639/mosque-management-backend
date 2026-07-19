import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';
import { UserRole } from '@/lib/prisma/client';

import { EXPENSE_MESSAGES } from '../constants/expense.constants';

@Injectable()
export class DeleteExpenseService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(
        expenseId: string,
        userId: string,
        role: UserRole,
    ): Promise<{ message: string }> {
        const expense = await this.prisma.expense.findUnique({
            where: {
                id: expenseId,
            },
            select: {
                id: true,
                createdById: true,
            },
        });

        if (!expense) {
            throw new NotFoundException(EXPENSE_MESSAGES.NOT_FOUND);
        }

        const isOwner = expense.createdById === userId;

        const isSuperAdmin = role === UserRole.SUPER_ADMIN;

        if (!isOwner && !isSuperAdmin) {
            throw new ForbiddenException(EXPENSE_MESSAGES.FORBIDDEN);
        }

        await this.prisma.expense.delete({
            where: {
                id: expenseId,
            },
        });

        return {
            message: EXPENSE_MESSAGES.DELETED,
        };
    }
}
