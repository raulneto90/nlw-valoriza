import { ICreateTagDTO } from '@modules/tags/dtos/ICreateTagDTO';
import { Tag } from '@modules/tags/entities/Tag';

import { ITagsRepository } from '../ITagsRepository';

export class FakeTagsRepository implements ITagsRepository {
  private tags: Tag[];

  constructor() {
    this.tags = [];
  }

  async create(data: ICreateTagDTO): Promise<Tag> {
    const tag = new Tag();

    Object.assign(tag, data);

    this.tags.push(tag);

    return tag;
  }

  async findOne(name: string): Promise<Tag> {
    return this.tags.find(tag => tag.name === name);
  }

  async findAll(): Promise<Tag[]> {
    return this.tags;
  }
}
