import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { departamento } from '../../db/schema/index.js';
import type { CreateDepartamentoData, DepartamentoData } from './departamento-types.js';
import { eq } from 'drizzle-orm';

export interface DepartamentoRepository {
  findAll(): Promise<DepartamentoData[]>;
  create(data: CreateDepartamentoData): Promise<DepartamentoData>;
  delete(id: number): Promise<boolean>;
}

export const createDepartamentoRepository = (db: NodePgDatabase): DepartamentoRepository => ({
  async findAll() {
    const result = await db.select().from(departamento);
    return result;
  },

  async create(data) {
    const result = await db.insert(departamento).values(data).returning();

    return result[0];
  },

  async delete(id) {
    const result = await db.delete(departamento).where(eq(departamento.id, id)).returning();

    return result.length > 0;
  },
});
