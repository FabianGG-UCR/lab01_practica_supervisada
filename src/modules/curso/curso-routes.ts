import { Router } from 'express';
import { createCursoRepository } from './curso-repository';
import { createCursoService } from './curso-service';
import { createCursoController } from './curso-controller';
import { db } from '../../db/config';

const cursoRouter = Router();

// Instantiate dependencies
const cursoRepo = createCursoRepository(db);
const cursoService = createCursoService({ cursoRepo });
const cursoController = createCursoController(cursoService);

// Routes
cursoRouter.post('/cursos', cursoController.create);
cursoRouter.get('/cursos', cursoController.getAll);
cursoRouter.get('/cursos/paginated', cursoController.getPaginated);
cursoRouter.put('/cursos/:id', cursoController.update);
cursoRouter.delete('/cursos/:id', cursoController.delete);

export default cursoRouter;
