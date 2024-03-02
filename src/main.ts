import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('port');
  const logger = new Logger('Application');
  await app.listen(PORT).then(() => {
    logger.log('Application listening on port:', PORT);
  }).catch((error) => {
    logger.error('Application failed to start:', error);
  });

  //swagger config
  const config = new DocumentBuilder()
    .setTitle('GB Store')
    .setDescription('The store API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
bootstrap();
