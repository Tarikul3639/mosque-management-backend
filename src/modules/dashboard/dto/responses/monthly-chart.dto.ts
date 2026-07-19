import { ApiProperty } from '@nestjs/swagger';

export class MonthlyChartDto {
    @ApiProperty({
        example: 'Jan',
        description: 'Month name.',
    })
    month!: string;

    @ApiProperty({
        example: 25000,
        description: 'Total donation amount.',
    })
    donation!: number;

    @ApiProperty({
        example: 18000,
        description: 'Total expense amount.',
    })
    expense!: number;
}