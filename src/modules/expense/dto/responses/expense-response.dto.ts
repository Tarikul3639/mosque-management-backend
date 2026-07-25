import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { ExpenseCategory } from '@/lib/prisma/client';

class ExpenseUserDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}

export class ExpenseResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({
    enum: ExpenseCategory,
  })
  category!: ExpenseCategory;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  amount!: string;

  @ApiPropertyOptional({
    nullable: true,
  })
  note!: string | null;

  @ApiProperty()
  expenseDate!: Date;

  @ApiProperty({
    type: ExpenseUserDto,
    nullable: true,
  })
  createdBy!: ExpenseUserDto | null;

  @ApiProperty({
    type: ExpenseUserDto,
    nullable: true,
  })
  updatedBy!: ExpenseUserDto | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}