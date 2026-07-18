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
import { PrismaModule } from '@/common/prisma/prisma.module';
import { CloudinaryModule } from '@/common/cloudinary/cloudinary.module';
import { MailModule } from '@/common/mail';
import { AuthModule } from './modules/auth/auth.module';
import { FamiliesModule } from './modules/families/families.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { DonationsModule } from './modules/donations/donations.module';
import { DonorsModule } from './modules/donors/donors.module';
import { CommitteeModule } from './modules/committee/committee.module'

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
    // AuthModule is imported here to make its services available throughout the application
    AuthModule,
    FamiliesModule,
    PaymentsModule,
    DonationsModule,
    DonorsModule,
    CommitteeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }