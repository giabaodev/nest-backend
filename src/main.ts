import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  //swagger config
  const config = new DocumentBuilder()
    .setTitle('GB Store')
    .setDescription('The store API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/api', app, document);

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('port');
  const logger = new Logger('Application');
  await app
    .listen(PORT)
    .then(() => {
      logger.log('Application listening on port:', PORT);
    })
    .catch((error) => {
      logger.error('Application failed to start:', error);
    });
}
bootstrap();
