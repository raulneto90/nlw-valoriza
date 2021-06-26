import { CreateTagController } from '@modules/tags/usecases/createTag/CreateTagController';
import { ListTagsController } from '@modules/tags/usecases/listTags/ListTagsController';
import { Router } from 'express';

import { ensureUserAdmin } from '../middlewares/ensureUserAdmin';
import { ensureUserAuthenticated } from '../middlewares/ensureUserAuthenticated';

const tagsRoutes = Router();

const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();

tagsRoutes.use(ensureUserAuthenticated);
tagsRoutes.use(ensureUserAdmin);
tagsRoutes.post('/', createTagController.handle);
tagsRoutes.get('/', listTagsController.handle);

export { tagsRoutes };
