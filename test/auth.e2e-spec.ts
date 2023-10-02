import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should handle sign up request', () => {
    const email: string = 'test@test.com';
    const password: string = 'password';

    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({ email: email, password: password })
      .expect(201)
      .expect((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('should sign up as a new user then get the currently logged in user', async () => {
    const email: string = 'test2@test.com';
    const password: string = 'password';

    const res = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({ email: email, password: password })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/who-am-i')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
