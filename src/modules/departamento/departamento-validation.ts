import { z } from 'zod';

export const CreateDepartamentoSchema = z.object({
  nombre: z.string().min(1).max(100).trim(),
});

// Type exports
export type CreateDepartamentoSchema = z.infer<typeof CreateDepartamentoSchema>;
