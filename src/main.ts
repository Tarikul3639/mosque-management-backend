import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const appName = configService.getOrThrow<string>('app.name');
  const appVersion = configService.getOrThrow<string>('app.version');
  const nodeEnv = configService.getOrThrow<string>('app.nodeEnv');

  const port = configService.getOrThrow<number>('app.port');
  const apiPrefix = configService.getOrThrow<string>('app.apiPrefix');
  const apiVersion = configService.getOrThrow<string>('app.apiVersion');

  app.setGlobalPrefix(apiPrefix);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: apiVersion,
  });

  app.enableShutdownHooks();

  app.enableCors({
    origin: configService.getOrThrow<string>('cors.origin'),
    methods: configService.getOrThrow<string>('cors.methods'),
    allowedHeaders: configService.getOrThrow<string>('cors.allowedHeaders'),
    credentials: configService.getOrThrow<boolean>('cors.credentials'),
  });

  const swaggerEnabled = configService.getOrThrow<boolean>("swagger.enabled");

  if (swaggerEnabled) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(appName)
      .setDescription(`${appName} API documentation`)
      .setVersion(appVersion)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(`${apiPrefix}/docs`, app, document);
  }

  await app.listen(port);

  console.log(`
  🚀 ${appName} v${appVersion}
  🌍 Environment : ${nodeEnv}
  📡 Server      : http://localhost:${port}
  🔗 API Base    : http://localhost:${port}/${apiPrefix}/v${apiVersion}
  📚 API Docs    : http://localhost:${port}/${apiPrefix}/docs
  `);
}

void bootstrap();
