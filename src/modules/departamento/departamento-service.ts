import { NotFoundError } from '../../shared/app-errors.js';
import type { DepartamentoRepository } from './departamento-repository.js';
import type { DepartamentoData } from './departamento-types.js';
import type { CreateDepartamentoSchema } from './departamento-validation.js';

export const createDepartamentoService = (deps: { departamentoRepo: DepartamentoRepository }) => ({
  async getAllDepartamentos(): Promise<DepartamentoData[]> {
    return await deps.departamentoRepo.findAll();
  },

  async createDepartamento(data: CreateDepartamentoSchema) {
    const departamento = await deps.departamentoRepo.create({
      nombre: data.nombre,
      id: data.id,
    });

    return {
      id: departamento.id,
      nombre: departamento.nombre,
    };
  },

  async deleteDepartamento(id: number) {
    const deleted = await deps.departamentoRepo.delete(id);

    if (!deleted) {
      throw new NotFoundError('Departamento', id);
    }
  },
});
