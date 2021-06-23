import { CreateUserUseCase } from '@modules/users/usecases/createUser/CreateUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, admin } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({ name, email, admin });

    return response.status(201).json(user);
  }
}
