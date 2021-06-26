import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListReceivedUserComplimentsUseCase } from './ListReceivedUserComplimentsUseCase';

export class ListReceivedUserComplimentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listReceivedUserCompliments = container.resolve(
      ListReceivedUserComplimentsUseCase,
    );

    const compliments = await listReceivedUserCompliments.execute(id);

    return response.json(compliments);
  }
}
