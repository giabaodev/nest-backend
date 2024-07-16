import { Logger } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function (app: NestApplication) {
  const logger = new Logger('NestApplication');
  const docPrefix = 'swagger';
  const config = new DocumentBuilder()
    .setTitle('GB Store')
    .setDescription('The store API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'accessToken',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'googleToken',
    )
    .addApiKey(
      {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
      },
      'xApiKey',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(docPrefix, app, document);
  logger.log(
    `Swagger API docs available at: http://localhost:3000/${docPrefix}`,
  );
}
