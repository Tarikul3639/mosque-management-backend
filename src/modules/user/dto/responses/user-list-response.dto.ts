import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';
import { MetaDto } from '../../../../common/dto/meta.dto';

export class UserListResponseDto {
  @ApiProperty({
    description: 'List of users',
    type: [UserResponseDto],
  })
  data!: UserResponseDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: MetaDto,
  })
  meta!: MetaDto;
}
