import type { Request, Response } from 'express';
import type { createDepartamentoService } from './departamento-service.js';

export const createDepartamentoController = (
  departamentoService: ReturnType<typeof createDepartamentoService>
) => ({
  async getAll(req: Request, res: Response) {
    const result = await departamentoService.getAllDepartamentos();
    res.json(result);
  },

  async create(req: Request, res: Response) {
    const result = await departamentoService.createDepartamento(req.body);
    res.status(201).json(result);
  },

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await departamentoService.deleteDepartamento(id);
    res.status(204).send();
  },
});
