import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerFactory } from './common/logging/logger-factory';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerFactory,
  });
  app.enableCors({ origin: '*' });
  // app.useLogger(app.get(LoggerService));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  //swagger config
  const config = new DocumentBuilder()
    .setTitle('GB Store')
    .setDescription('The store API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  //server startup
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('app.port');
  const logger = new Logger('Application');
  await app
    .listen(PORT)
    .then(() => {
      logger.log(`Application listening on port: ${PORT}`);
    })
    .catch((error) => {
      logger.error(`Application failed to start: ${error}`);
    });
}
bootstrap();
