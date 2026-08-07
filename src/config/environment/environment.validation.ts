import * as Joi from 'joi';

const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  API_PREFIX: Joi.string().required(),
  API_VERSION: Joi.string().required(),
  APP_VERSION: Joi.string().required(),
  APP_NAME: Joi.string().required(),
  // Bcrypt salt rounds for hashing passwords
  BCRYPT_SALT_ROUNDS: Joi.number().default(10),
  // JWT secrets for signing and verifying tokens
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string()
    .pattern(/^\d+(ms|s|m|h|d|w|y)$/)
    .required(),
  JWT_RESET_PASSWORD_SECRET: Joi.string().required(),
  JWT_RESET_PASSWORD_EXPIRES_IN: Joi.string()
    .pattern(/^\d+(ms|s|m|h|d|w|y)$/)
    .required(),
  COOKIE_MAX_AGE: Joi.string()
    .pattern(/^\d+(ms|s|m|h|d|w|y)$/)
    .required(),
  // Cloudinary configuration for image uploads
  // Database URL for connecting to the database
  DATABASE_URL: Joi.string().required(),
  // Frontend URL for CORS configuration
  CORS_ORIGIN: Joi.string().required(),
  CORS_METHODS: Joi.string().default('GET,POST,PUT,DELETE,PATCH'),
  CORS_ALLOWED_HEADERS: Joi.string().default('Content-Type,Authorization'),
  // Cloudinary configuration for image uploads
  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
  CLOUDINARY_ROOT_FOLDER: Joi.string().required(),
  // Swagger configuration for API documentation
  SWAGGER_ENABLED: Joi.boolean().default(false),
  // Log level for controlling the verbosity of logs
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'debug', 'verbose')
    .default('info'),
  // SMTP configuration for sending emails
  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.number().required(),
  SMTP_SECURE: Joi.boolean().default(false),
  SMTP_USER: Joi.string().required(),
  SMTP_PASS: Joi.string().required(),
  SMTP_FROM: Joi.string().required(),
});

export default envValidationSchema;
