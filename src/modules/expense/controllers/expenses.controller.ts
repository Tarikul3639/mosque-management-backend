import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@/lib/prisma/client';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

import { CreateExpenseService } from '../services/create-expense.service';
import { DeleteExpenseService } from '../services/delete-expense.service';
import { GetExpenseService } from '../services/get-expense.service';
import { GetExpenseSummaryService } from '../services/get-expense-summary.service';
import { ListExpensesService } from '../services/list-expenses.service';
import { UpdateExpenseService } from '../services/update-expense.service';

import { CreateExpenseDto } from '../dto/requests/create-expense.dto';
import { ExpenseQueryDto } from '../dto/requests/expense-query.dto';
import { UpdateExpenseDto } from '../dto/requests/update-expense.dto';

import { ExpenseResponseDto } from '../dto/responses/expense-response.dto';
import { ExpenseListResponseDto } from '../dto/responses/expense-list-response.dto';
import { ExpenseSummaryResponseDto } from '../dto/responses/expense-summary-response.dto';

@ApiTags('Expenses')
@Controller('expenses')
export class ExpensesController {
    constructor(
        private readonly createExpenseService: CreateExpenseService,
        private readonly updateExpenseService: UpdateExpenseService,
        private readonly deleteExpenseService: DeleteExpenseService,
        private readonly getExpenseService: GetExpenseService,
        private readonly listExpensesService: ListExpensesService,
        private readonly getExpenseSummaryService: GetExpenseSummaryService,
    ) { }

    @Get()
    @ApiOperation({
        summary: 'List expenses',
    })
    @ApiResponse({
        status: 200,
        type: ExpenseListResponseDto,
    })
    async findAll(
        @Query() query: ExpenseQueryDto,
    ): Promise<ExpenseListResponseDto> {
        return this.listExpensesService.execute(query);
    }

    @Get('summary')
    @ApiOperation({
        summary: 'Get expense summary',
    })
    @ApiResponse({
        status: 200,
        type: ExpenseSummaryResponseDto,
    })
    async summary(): Promise<ExpenseSummaryResponseDto> {
        return this.getExpenseSummaryService.execute();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get expense by ID',
    })
    @ApiResponse({
        status: 200,
        type: ExpenseResponseDto,
    })
    async findOne(@Param('id') id: string): Promise<ExpenseResponseDto> {
        return this.getExpenseService.execute(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Create expense',
    })
    @ApiResponse({
        status: 201,
        type: ExpenseResponseDto,
    })
    async create(
        @CurrentUser('sub') userId: string,
        @Body() dto: CreateExpenseDto,
    ): Promise<ExpenseResponseDto> {
        return this.createExpenseService.execute(dto, userId);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Update expense',
    })
    @ApiResponse({
        status: 200,
        type: ExpenseResponseDto,
    })
    async update(
        @Param('id') id: string,
        @CurrentUser() user: { sub: string; role: UserRole },
        @Body() dto: UpdateExpenseDto,
    ): Promise<ExpenseResponseDto> {
        return this.updateExpenseService.execute(id, dto, user.sub, user.role);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Delete expense',
    })
    @ApiResponse({
        status: 200,
        schema: {
            example: {
                message: 'Expense deleted successfully.',
            },
        },
    })
    async remove(
        @Param('id') id: string,
        @Req() req: any,
    ): Promise<{ message: string }> {
        return this.deleteExpenseService.execute(id, req.user.id, req.user.role);
    }
}
