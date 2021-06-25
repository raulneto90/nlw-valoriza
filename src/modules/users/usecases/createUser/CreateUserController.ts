import { CreateUserUseCase } from '@modules/users/usecases/createUser/CreateUserUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, admin, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      admin,
      password,
    });

    return response.status(201).json(classToClass(user));
  }
}
