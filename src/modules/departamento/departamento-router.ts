import { Router } from 'express';
import { createDepartamentoRepository } from './departamento-repository.js';
import { createDepartamentoService } from './departamento-service.js';
import { createDepartamentoController } from './departamento-controller.js';
import { db } from '../../db/config.js';

const departamentoRouter = Router();

const departamentoRepo = createDepartamentoRepository(db);
const departamentoService = createDepartamentoService({ departamentoRepo });
const departamentoController = createDepartamentoController(departamentoService);

departamentoRouter.get('/departamentos', departamentoController.getAll);
departamentoRouter.post('/departamentos', departamentoController.create);
departamentoRouter.delete('/departamentos/:id', departamentoController.delete);

export default departamentoRouter;
