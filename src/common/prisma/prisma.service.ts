import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/lib/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL!,
      }),
    });
  }

  async onModuleInit(): Promise<void> {
    // this.logger.log("🔄 Connecting to database...");
    console.log('🔄 Connecting to database...');

    try {
      await this.$connect();

      // this.logger.log("Database connected successfully.");
      console.log('✅ Database connected successfully.');
    } catch (error) {
      this.logger.fatal?.('Failed to connect to the database.', error);

      // Stop the application if the database connection fails
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    console.log('❌ Database disconnected.');
    // this.logger.log("Database disconnected.");
  }
}
