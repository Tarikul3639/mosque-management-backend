import { Module } from '@nestjs/common';

import { PrismaModule } from '@/common/prisma/prisma.module';

import { ExpensesController } from './controllers/expenses.controller';

import { CreateExpenseService } from './services/create-expense.service';
import { DeleteExpenseService } from './services/delete-expense.service';
import { GetExpenseService } from './services/get-expense.service';
import { GetExpenseSummaryService } from './services/get-expense-summary.service';
import { ListExpensesService } from './services/list-expenses.service';
import { UpdateExpenseService } from './services/update-expense.service';

@Module({
  imports: [PrismaModule],

  controllers: [ExpensesController],

  providers: [
    CreateExpenseService,
    UpdateExpenseService,
    DeleteExpenseService,
    GetExpenseService,
    ListExpensesService,
    GetExpenseSummaryService,
  ],

  exports: [
    CreateExpenseService,
    UpdateExpenseService,
    DeleteExpenseService,
    GetExpenseService,
    ListExpensesService,
    GetExpenseSummaryService,
  ],
})
export class ExpensesModule {}
