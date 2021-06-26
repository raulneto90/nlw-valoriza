import { ICreateTagDTO } from '@modules/tags/dtos/ICreateTagDTO';
import { Tag } from '@modules/tags/entities/Tag';
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateTagUseCase {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  async execute({ name }: ICreateTagDTO): Promise<Tag> {
    const tagExists = await this.tagsRepository.findOne(name);

    if (tagExists) {
      throw new AppError('Tag already exists!');
    }

    const tag = await this.tagsRepository.create({ name });

    return tag;
  }
}
