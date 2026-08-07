import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../../common/prisma/prisma.service';
import { UserRole } from '../../../lib/prisma/client';

import { EXPENSE_MESSAGES } from '../constants/expense.constants';
import { UpdateExpenseDto } from '../dto/requests/update-expense.dto';
import { ExpenseResponseDto } from '../dto/responses/expense-response.dto';
import { ExpenseMapper } from '../mappers/expense.mapper';

@Injectable()
export class UpdateExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    expenseId: string,
    dto: UpdateExpenseDto,
    userId: string,
    role: UserRole,
  ): Promise<ExpenseResponseDto> {
    const existingExpense = await this.prisma.expense.findUnique({
      where: {
        id: expenseId,
      },
      select: {
        id: true,
        createdById: true,
      },
    });

    if (!existingExpense) {
      throw new NotFoundException(EXPENSE_MESSAGES.NOT_FOUND);
    }

    const isOwner = existingExpense.createdById === userId;

    const isSuperAdmin = role === UserRole.SUPER_ADMIN;

    if (!isOwner && !isSuperAdmin) {
      throw new ForbiddenException(EXPENSE_MESSAGES.FORBIDDEN);
    }

    const expense = await this.prisma.expense.update({
      where: {
        id: expenseId,
      },
      data: {
        ...(dto.category && {
          category: dto.category,
        }),

        ...(dto.title && {
          title: dto.title,
        }),

        ...(dto.amount !== undefined && {
          amount: dto.amount,
        }),

        ...(dto.note !== undefined && {
          note: dto.note,
        }),

        ...(dto.expenseDate && {
          expenseDate: new Date(dto.expenseDate),
        }),

        updatedById: userId,
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

    return ExpenseMapper.toResponse(expense);
  }
}
