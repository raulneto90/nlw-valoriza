import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListTagsUseCase } from './ListTagsUseCase';

export class ListTagsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTags = container.resolve(ListTagsUseCase);

    const tags = await listTags.execute();

    return response.json(classToPlain(tags));
  }
}
