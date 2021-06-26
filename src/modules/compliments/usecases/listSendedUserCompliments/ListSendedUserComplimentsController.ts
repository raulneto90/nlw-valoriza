import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSendedUserComplimentsUseCase } from './ListSendedUserComplimentsUseCase';

export class ListSendedUserComplimentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listSendedUserCompliments = container.resolve(
      ListSendedUserComplimentsUseCase,
    );

    const compliments = await listSendedUserCompliments.execute(id);

    return response.json(compliments);
  }
}
