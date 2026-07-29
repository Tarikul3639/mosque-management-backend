import { registerAs } from '@nestjs/config';
import ms, { StringValue} from 'ms';

export default registerAs('cookies', () => ({
    maxAge: ms(process.env.COOKIE_MAX_AGE as StringValue),
}));