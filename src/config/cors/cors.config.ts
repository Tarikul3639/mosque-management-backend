import { registerAs } from "@nestjs/config";

export default registerAs("cors", () => ({
    origin: process.env.CORS_ORIGIN,
    methods: process.env.CORS_METHODS?.split(","),
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS?.split(","),
    credentials: process.env.CORS_CREDENTIALS === "true",
}));