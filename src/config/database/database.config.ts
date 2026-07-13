import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
    connectionString: process.env.DATABASE_URL,
}));