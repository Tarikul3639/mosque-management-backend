import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { EXPENSE_MESSAGES } from '../constants/expense.constants';
import { ExpenseResponseDto } from '../dto/responses/expense-response.dto';
import { ExpenseMapper } from '../mappers/expense.mapper';

@Injectable()
export class GetExpenseService {
    constructor(private readonly prisma: PrismaService) { }

    async execute(expenseId: string): Promise<ExpenseResponseDto> {
        const expense = await this.prisma.expense.findUnique({
            where: {
                id: expenseId,
            },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                updatedBy: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        if (!expense) {
            throw new NotFoundException(EXPENSE_MESSAGES.NOT_FOUND);
        }

        return ExpenseMapper.toResponse(expense);
    }
}
