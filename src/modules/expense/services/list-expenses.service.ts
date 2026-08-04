import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import {
  EXPENSE_DEFAULT_LIMIT,
  EXPENSE_DEFAULT_PAGE,
} from '../constants/expense.constants';
import { ExpenseQueryDto } from '../dto/requests/expense-query.dto';
import { ExpenseListResponseDto } from '../dto/responses/expense-list-response.dto';
import { ExpenseMapper } from '../mappers/expense.mapper';

@Injectable()
export class ListExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: ExpenseQueryDto): Promise<ExpenseListResponseDto> {
    const page = query.page ?? EXPENSE_DEFAULT_PAGE;
    const limit = query.limit ?? EXPENSE_DEFAULT_LIMIT;
    const skip = (page - 1) * limit;

    const where = {
      ...(query.search && {
        OR: [
          {
            title: {
              contains: query.search,
              mode: 'insensitive' as const,
            },
          },
          {
            note: {
              contains: query.search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),

      ...(query.category && {
        category: query.category,
      }),
    };

    const [expenses, total] = await Promise.all([
      this.prisma.expense.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          expenseDate: 'desc',
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
      }),

      this.prisma.expense.count({
        where,
      }),
    ]);

    return {
      data: ExpenseMapper.toResponseList(expenses),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
