import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateComplimentUseCase } from './CreateComplimentUseCase';

export class CreateComplimentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_receiver, tag_id, message } = request.body;
    const { id } = request.user;

    const createComplimentUseCase = container.resolve(CreateComplimentUseCase);

    const compliment = await createComplimentUseCase.execute({
      user_sender: id,
      user_receiver,
      tag_id,
      message,
    });

    return response.status(201).json(compliment);
  }
}
