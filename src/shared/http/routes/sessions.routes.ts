import { AuthenticateUserController } from '@modules/users/usecases/authenticateUser/AuthenticateUserController';
import { Router } from 'express';

const sessionsRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

sessionsRoutes.post('/', authenticateUserController.handle);

export { sessionsRoutes };
