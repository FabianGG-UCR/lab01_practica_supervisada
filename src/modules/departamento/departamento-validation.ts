import { z } from 'zod';

export const CreateDepartamentoSchema = z.object({
  id: z.number().min(1),
  nombre: z.string().min(1).max(100).trim(),
});

// Type exports
export type CreateDepartamentoSchema = z.infer<typeof CreateDepartamentoSchema>;
