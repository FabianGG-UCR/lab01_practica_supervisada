import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const departamento = pgTable('departamento', {
  id: serial().primaryKey().notNull(),
  nombre: varchar({ length: 50 }).notNull(),
});
