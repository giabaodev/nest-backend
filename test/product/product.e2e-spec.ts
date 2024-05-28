import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ProductModule } from 'src/modules/product/product.module';
import { ProductService } from 'src/modules/product/product.service';
import * as request from 'supertest';
import { App } from 'supertest/types';

describe('Products', () => {
  let app: INestApplication;
  const productsService = { findAll: () => ['test'] };
  let httpServer: App;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProductModule],
    })
      .overrideProvider(ProductService)
      .useValue(productsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();
  });

  describe('Create Product', () => {
    it('Should create a new Product', async () => {
      const response = await request(httpServer);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
