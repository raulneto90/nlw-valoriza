import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUsersUseCase } from './ListUsersUseCase';

export class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersUseCase);

    const users = await listUsers.execute();

    return response.json(classToClass(users));
  }
}
