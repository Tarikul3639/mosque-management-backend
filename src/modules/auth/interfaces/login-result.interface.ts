import { CurrentUserDto } from '../dto/responses/current-user.dto';

export interface LoginResult {
    accessToken: string;
    user: CurrentUserDto;
}