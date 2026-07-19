import { ApiProperty } from '@nestjs/swagger';

import { ExpenseResponseDto } from './expense-response.dto';

class PaginationMetaDto {
    @ApiProperty()
    page!: number;

    @ApiProperty()
    limit!: number;

    @ApiProperty()
    total!: number;

    @ApiProperty()
    totalPages!: number;
}

export class ExpenseListResponseDto {
    @ApiProperty({
        type: [ExpenseResponseDto],
    })
    data!: ExpenseResponseDto[];

    @ApiProperty({
        type: PaginationMetaDto,
    })
    meta!: PaginationMetaDto;
}
