import { ListReceivedUserComplimentsController } from '@modules/compliments/usecases/listReceivedUserCompliments/ListReceivedUserComplimentsController';
import { ListSendedUserComplimentsController } from '@modules/compliments/usecases/listSendedUserCompliments/ListSendedUserComplimentsController';
import { CreateUserController } from '@modules/users/usecases/createUser/CreateUserController';
import { ListUsersController } from '@modules/users/usecases/listUsers/ListUsersController';
import { Router } from 'express';

import { ensureUserAuthenticated } from '../middlewares/ensureUserAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listReceivedUserComplimentsController =
  new ListReceivedUserComplimentsController();

const listSendedUserComplimentsController =
  new ListSendedUserComplimentsController();

const listUsersController = new ListUsersController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', ensureUserAuthenticated, listUsersController.handle);

usersRoutes.use(ensureUserAuthenticated);
usersRoutes.get(
  '/compliments/send',
  listSendedUserComplimentsController.handle,
);

usersRoutes.get(
  '/compliments/receive',
  listReceivedUserComplimentsController.handle,
);

export { usersRoutes };
