import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    cors: {
      origin: 'https://pixiviz.pwp.app',
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });
  const configService = app.get<ConfigService>(ConfigService);
  // add validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(Number(configService.get('PORT')) || 8080);
}

bootstrap();
