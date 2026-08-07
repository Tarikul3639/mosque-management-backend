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
  cookieConfig,
} from './config';
import { PrismaModule } from './common/prisma/prisma.module';
import { CloudinaryModule } from './common/cloudinary/cloudinary.module';
import { MailModule } from './common/mail';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { FamiliesModule } from './modules/families/families.module';
import { DonorsModule } from './modules/donors/donors.module';
import { DonationsModule } from './modules/donations/donations.module';
import { ExpensesModule } from './modules/expense/expenses.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { CommitteeModule } from './modules/committee/committee.module';
import { ProjectsModule } from './modules/project/projects.module';
import { GalleriesModule } from './modules/gallery/galleries.module';
import { PrayerTimesModule } from './modules/prayer-times/prayer-times.module';
import { UploadsModule } from './common/uploads/uploads.module';
import { FileModule } from './common/file/file.module';
import { MonthlyChargesModule } from './modules/monthly-charges/families.module';
import { MonthlyFeesModule } from './modules/monthly-fees/families.module';
import { SearchModule } from './modules/search/search.module';

import { AppController } from './app.controller';

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
        cookieConfig,
      ],
    }),
    MailModule,
    PrismaModule,
    CloudinaryModule,
    FileModule,
    // AuthModule is imported here to make its services available throughout the application
    UserModule,
    AuthModule,

    // Sidebar Navigation Ordered Modules
    DashboardModule,
    FamiliesModule,
    MonthlyFeesModule,
    MonthlyChargesModule,
    DonorsModule,
    DonationsModule,
    ExpensesModule,
    PaymentsModule,
    CommitteeModule,
    ProjectsModule,
    GalleriesModule,
    SearchModule,

    // Other Utility/Feature Modules
    PrayerTimesModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
