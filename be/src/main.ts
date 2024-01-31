import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : [];

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: corsOrigins,
  })
  await app.listen(port);
}
bootstrap();
