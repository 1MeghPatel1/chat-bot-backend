import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './common/execptions/ExceptionFilter';
import { ConfigService } from '@nestjs/config';
import { swaggerConfig } from './config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
