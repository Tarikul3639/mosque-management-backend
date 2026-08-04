import { ApiProperty } from '@nestjs/swagger';
import { CurrentUserDto } from './current-user.dto';

export class LoginResponseDto {
  @ApiProperty({
    type: CurrentUserDto,
  })
  user!: CurrentUserDto;
}
