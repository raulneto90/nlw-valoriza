import { CreateUserService } from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, admin } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ name, email, admin });

    return response.status(201).json(user);
  }
}
