import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GallerySummaryResponseDto {
  @ApiProperty()
  totalImages!: number;

  @ApiPropertyOptional({
    nullable: true,
  })
  lastUploadedAt!: Date | null;
}