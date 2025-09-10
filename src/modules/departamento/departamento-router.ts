import { Router } from 'express';
import { createDepartamentoRepository } from './departamento-repository';
import { createDepartamentoService } from './departamento-service';
import { createDepartamentoController } from './departamento-controller';
import { db } from '../../db/config';

const departamentoRouter = Router();

const departamentoRepo = createDepartamentoRepository(db);
const departamentoService = createDepartamentoService({ departamentoRepo });
const departamentoController = createDepartamentoController(departamentoService);

departamentoRouter.get('/departamentos', departamentoController.getAll);

export default departamentoRouter;
