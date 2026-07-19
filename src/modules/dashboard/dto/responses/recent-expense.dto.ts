import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from '@/lib/prisma/client';

export class RecentExpenseDto {
    @ApiProperty({
        example: 'f3a1b4c5-d6e7-8901-2345-67890abcdef1',
    })
    id!: string;

    @ApiProperty({
        example: 'Electricity Bill',
    })
    title!: string;

    @ApiProperty({
        enum: ExpenseCategory,
        example: ExpenseCategory.ELECTRICITY,
    })
    category!: ExpenseCategory;

    @ApiProperty({
        example: 3500,
    })
    amount!: number;

    @ApiProperty({
        example: '2026-07-20T10:30:00.000Z',
    })
    expenseDate!: Date;
}