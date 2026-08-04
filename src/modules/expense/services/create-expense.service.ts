import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { CreateExpenseDto } from '../dto/requests/create-expense.dto';
import { ExpenseResponseDto } from '../dto/responses/expense-response.dto';
import { ExpenseMapper } from '../mappers/expense.mapper';

@Injectable()
export class CreateExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    dto: CreateExpenseDto,
    userId: string,
  ): Promise<ExpenseResponseDto> {
    const expense = await this.prisma.expense.create({
      data: {
        category: dto.category,
        title: dto.title,
        amount: dto.amount,
        note: dto.note,
        expenseDate: new Date(dto.expenseDate),

        createdById: userId,
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
