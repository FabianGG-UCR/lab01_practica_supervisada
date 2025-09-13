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

describe('CRUD cursos', () => {
  let idDepartamento: number;
  let idCreado: number;

  beforeAll(async () => {
    const res = await request(app).post('/api/departamentos').send({
      nombre: 'Test_Departamento',
      id: 9999,
    });
    idDepartamento = res.body.id;
  });

  it('Crear curso', async () => {
    const res = await request(app).post('/api/cursos').send({
      sigla: 'ABCD',
      nombre: 'Test_Curso',
      idDepartamento,
    });
    expect(res.status).toBe(201);
    idCreado = res.body.id;
  });

  it('Leer curso', async () => {
    const res = await request(app).get(`/api/cursos/${idCreado}`);
    expect(res.status).toBe(200);
    expect(res.body.sigla).toBe('ABCD');
  });

  it('Actualizar curso', async () => {
    const res = await request(app).put(`/api/cursos/${idCreado}`).send({
      nombre: 'Test_curso_actualizado',
    });
    expect(res.status).toBe(200);
  });

  it('Eliminar curso', async () => {
    const res = await request(app).delete(`/api/cursos/${idCreado}`);
    expect(res.status).toBe(204);
  });

  afterAll(async () => {
    await request(app).delete(`/api/departamentos/${idDepartamento}`);
  });
});
