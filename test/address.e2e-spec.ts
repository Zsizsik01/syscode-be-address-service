import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AddressController } from '../src/address/controllers';
import { AddressService } from '../src/address/services';

describe('AddressController e2e', () => {
  let app: INestApplication;

  const validAuth = 'Basic ' + Buffer.from('admin:password').toString('base64');

  const invalidAuth = 'Basic ' + Buffer.from('wrong:creds').toString('base64');

  const malformedAuth = 'BasicOnly';

  const testId = '81059ec7-3136-4485-acdf-3f76e4d1c574';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [AddressService],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('[AUTH] BasicAuthGuard error cases', () => {
    it('should return 401 - UnauthorizedError when Authorization header is missing', async () => {
      await request(app.getHttpServer()).get('/address/1').expect(401);
    });

    it('should return 401 - UnauthorizedError when Authorization header has invalid format', async () => {
      await request(app.getHttpServer())
        .get('/address/1')
        .set('Authorization', malformedAuth)
        .expect(401);
    });

    it('should return 401 - UnauthorizedError when username/password is invalid', async () => {
      await request(app.getHttpServer())
        .get('/address/1')
        .set('Authorization', invalidAuth)
        .expect(401);
    });
  });

  describe('[POST] /address', () => {
    it('should return with 400 - BadRequestError when the id property is missing', async () => {
      await request(app.getHttpServer())
        .post('/address')
        .set('Authorization', validAuth)
        .send({ address: 'Budapest' })
        .expect(400);
    });

    it('should return with 400 - BadRequestError when the address property is missing', async () => {
      await request(app.getHttpServer())
        .post('/address')
        .set('Authorization', validAuth)
        .send({ id: '1' })
        .expect(400);
    });

    it('should return 201 - Created when the payload is valid', async () => {
      const result = await request(app.getHttpServer())
        .post('/address')
        .set('Authorization', validAuth)
        .send({ id: testId, address: 'Budapest' })
        .expect(201);

      expect(result.body).toEqual({ id: testId, address: 'Budapest' });
    });
  });

  describe('[GET] /address/:id', () => {
    it('should return with the created address', async () => {
      const result = await request(app.getHttpServer())
        .get(`/address/${testId}`)
        .set('Authorization', validAuth)
        .expect(200);

      expect(result.body).toEqual({
        id: testId,
        address: 'Budapest',
      });
    });

    it('should return with 404 - NotFoundError when the address is not found with the given id', async () => {
      await request(app.getHttpServer())
        .get('/address/999')
        .set('Authorization', validAuth)
        .expect(404);
    });
  });

  describe('[PUT] /address/:id', () => {
    it('should return 400 - BadRequestError when the address property is missing', async () => {
      await request(app.getHttpServer())
        .put('/address/1')
        .set('Authorization', validAuth)
        .send({})
        .expect(400);
    });

    it('should update the selected address successfully', async () => {
      const result = await request(app.getHttpServer())
        .put(`/address/${testId}`)
        .set('Authorization', validAuth)
        .send({ address: 'Updated City' })
        .expect(200);

      expect(result.body).toEqual({
        id: testId,
        address: 'Updated City',
      });
    });

    it('should return with 404 - NotFoundError when the address is not found with the given id', async () => {
      await request(app.getHttpServer())
        .put('/address/999')
        .set('Authorization', validAuth)
        .send({ address: 'Nope' })
        .expect(404);
    });
  });

  describe('[DELETE] /address/:id', () => {
    it('should delete the selected address successfully', async () => {
      await request(app.getHttpServer())
        .delete('/address/1')
        .set('Authorization', validAuth)
        .expect(200);
    });

    it('should return with 404 - NotFoundError when the address is not found with the given id', async () => {
      await request(app.getHttpServer())
        .get('/address/1')
        .set('Authorization', validAuth)
        .expect(404);
    });
  });
});
