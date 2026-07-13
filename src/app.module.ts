import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  appConfig,
  authConfig,
  bcryptConfig,
  cloudinaryConfig,
  corsConfig,
  databaseConfig,
  loggerConfig,
  mailConfig,
  swaggerConfig,
  envValidationSchema,
} from './config';
import { PrismaModule } from './common/prisma/prisma.module';
import { CloudinaryModule } from './common/cloudinary/cloudinary.module';
import { MailModule } from './common/mail';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema: envValidationSchema,
      envFilePath: [
        '.env',
        '.env.local',
        '.env.development.local',
        '.env.test.local',
        '.env.production.local',
      ],
      load: [
        appConfig,
        authConfig,
        bcryptConfig,
        cloudinaryConfig,
        corsConfig,
        databaseConfig,
        loggerConfig,
        mailConfig,
        swaggerConfig,
      ],
    }),
    MailModule,
    PrismaModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }