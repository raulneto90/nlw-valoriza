import { CreateTagController } from '@modules/tags/usecases/createTag/CreateTagController';
import { Router } from 'express';

import { ensureUserAdmin } from '../middlewares/ensureUserAdmin';

const tagsRoutes = Router();

const createTagController = new CreateTagController();

tagsRoutes.use(ensureUserAdmin);
tagsRoutes.post('/', createTagController.handle);

export { tagsRoutes };
