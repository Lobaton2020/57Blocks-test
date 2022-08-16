import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IAppConfig } from './config/app';
import { APP_CONFIG } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<IAppConfig>(ConfigService);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const swaggerConfig = new DocumentBuilder()
    .setTitle('57Blocks API')
    .setDescription('API to consume the resources')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup(
    'api/v1/docs',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );
  await app.listen(config.get<IAppConfig>(APP_CONFIG).httpPort);
}
bootstrap();