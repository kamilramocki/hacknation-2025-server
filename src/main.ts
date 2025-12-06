import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Hacknation 2025 API')
    .setDescription('API for website verification using QR codes. Verify that websites are legitimate by scanning time-based tokens.')
    .setVersion('1.0')
    .addTag('websites', 'Website management and token verification')
    .addTag('domain-addresses', 'Domain address management')
    .addTag('ip-addresses', 'IP address management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({
    origin: '*', // TODO: remove in production
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // TODO: remove in production
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`Swagger docs available at: http://localhost:${process.env.PORT ?? 3000}/api/docs`);
}
bootstrap();
