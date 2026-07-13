import { registerAs } from "@nestjs/config";

export default registerAs("mail", () => ({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",

  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,

  from: process.env.SMTP_FROM,
}));