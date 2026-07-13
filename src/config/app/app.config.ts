import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    port: Number(process.env.PORT),
    apiPrefix: process.env.API_PREFIX,
    apiVersion: process.env.API_VERSION,
    nodeEnv: process.env.NODE_ENV,
    isProduction: process.env.NODE_ENV === "production",
}));