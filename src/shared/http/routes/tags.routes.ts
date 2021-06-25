import { CreateTagController } from '@modules/tags/usecases/createTag/CreateTagController';
import { Router } from 'express';

import { ensureUserAdmin } from '../middlewares/ensureUserAdmin';
import { ensureUserAuthenticated } from '../middlewares/ensureUserAuthenticated';

const tagsRoutes = Router();

const createTagController = new CreateTagController();

tagsRoutes.use(ensureUserAuthenticated);
tagsRoutes.use(ensureUserAdmin);
tagsRoutes.post('/', createTagController.handle);

export { tagsRoutes };
