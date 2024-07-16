import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService as MyLogger } from './common/logging/logger.service';
import swaggerSetup from './swagger';

async function bootstrap(): Promise<void> {
  const app: NestApplication = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.enableCors({ origin: '*' });
  app.useLogger(app.get(MyLogger));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  //swagger startup
  swaggerSetup(app);

  //server startup
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('app.port');
  const logger = new Logger('NestApplication');
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
