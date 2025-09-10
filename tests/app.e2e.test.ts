import request from 'supertest';
import { app } from '../src/app';

describe('App E2E', () => {
  it('return "status: ok" && status 200 on  /health/livez', async () => {
    const res = await request(app).get('/health/livez');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('POST /api/cursos', () => {
  it('should return 400 for invalid data', async () => {
    const response = await request(app).post('/api/cursos').send({
      sigla: '',
      nombre: 'Test Course',
      idDepartamento: -1,
    });
    expect(response.status).toBe(400);
  });
});
