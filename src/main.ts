import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  /**
   * Swagger Configuration
   */
  const config = new DocumentBuilder()
  .setTitle('Money Saver API')
  .setDescription('The Money Saver API Application')
  .setTermsOfService('https://example.com/terms')
  .setLicense('Apache 2.0', 'https://www.apache.org/licenses/LICENSE-2.0.html')
  .addServer('http://localhost:3000', 'Development Server')

  .setVersion('1.0').build()
  // Instantiate a Document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // enable cors
  app.enableCors({
    origin: 'http://localhost:3001', // or whatever port your frontend runs on
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
