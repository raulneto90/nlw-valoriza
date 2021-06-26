import { Tag } from '@modules/tags/entities/Tag';
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListTagsUseCase {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  async execute(): Promise<Tag[]> {
    const tags = await this.tagsRepository.findAll();

    return tags;
  }
}
