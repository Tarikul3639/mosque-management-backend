import { registerAs } from "@nestjs/config";

export default registerAs("bcrypt", () => ({
    saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
}));