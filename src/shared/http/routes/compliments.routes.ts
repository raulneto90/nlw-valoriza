import { CreateComplimentController } from '@modules/compliments/usecases/createCompliment/CreateComplimentController';
import { Router } from 'express';

import { ensureUserAuthenticated } from '../middlewares/ensureUserAuthenticated';

const complimentsRoutes = Router();

const createComplimentController = new CreateComplimentController();

complimentsRoutes.post(
  '/',
  ensureUserAuthenticated,
  createComplimentController.handle,
);

export { complimentsRoutes };
