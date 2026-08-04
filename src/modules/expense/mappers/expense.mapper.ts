import { Prisma } from '@/lib/prisma/client';
import { ExpenseResponseDto } from '../dto/responses/expense-response.dto';

type ExpenseWithUsers = Prisma.ExpenseGetPayload<{
  include: {
    createdBy: {
      select: {
        id: true;
        name: true;
      };
    };
    updatedBy: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

export class ExpenseMapper {
  static toResponse(expense: ExpenseWithUsers): ExpenseResponseDto {
    return {
      id: expense.id,
      category: expense.category,
      title: expense.title,
      amount: expense.amount.toString(),
      note: expense.note,
      expenseDate: expense.expenseDate,
      createdBy: expense.createdBy
        ? {
            id: expense.createdBy.id,
            name: expense.createdBy.name,
          }
        : null,
      updatedBy: expense.updatedBy
        ? {
            id: expense.updatedBy.id,
            name: expense.updatedBy.name,
          }
        : null,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
    };
  }

  static toResponseList(expenses: ExpenseWithUsers[]): ExpenseResponseDto[] {
    return expenses.map((expense) => ExpenseMapper.toResponse(expense));
  }
}
