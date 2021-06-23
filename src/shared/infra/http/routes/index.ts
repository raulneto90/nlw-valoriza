import { Router } from 'express';

import { tagsRoutes } from './tags.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/tags', tagsRoutes);

export default routes;
