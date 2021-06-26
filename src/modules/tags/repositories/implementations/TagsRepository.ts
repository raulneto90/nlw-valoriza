import { ICreateTagDTO } from '@modules/tags/dtos/ICreateTagDTO';
import { Tag } from '@modules/tags/entities/Tag';
import { getRepository, Repository } from 'typeorm';

import { ITagsRepository } from '../ITagsRepository';

export class TagsRepository implements ITagsRepository {
  private repository: Repository<Tag>;

  constructor() {
    this.repository = getRepository(Tag);
  }

  async create(data: ICreateTagDTO): Promise<Tag> {
    const tag = this.repository.create(data);

    await this.repository.save(tag);

    return tag;
  }

  async findOne(name: string): Promise<Tag> {
    return this.repository.findOne({ name });
  }

  async findAll(): Promise<Tag[]> {
    return this.repository.find();
  }
}
