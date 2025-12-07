import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Address e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('[GET] /address, should require auth', () => {
    return request(app.getHttpServer()).get('/address').expect(401);
  });

  it('[GET] /address, returns address with auth', () => {
    const authHeader =
      'Basic ' + Buffer.from('admin:password').toString('base64');
    return request(app.getHttpServer())
      .get('/address')
      .set('Authorization', authHeader)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('address');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
