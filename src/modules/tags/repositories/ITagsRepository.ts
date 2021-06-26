import { ICreateTagDTO } from '@modules/tags/dtos/ICreateTagDTO';

import { Tag } from '../entities/Tag';

export interface ITagsRepository {
  create(data: ICreateTagDTO): Promise<Tag>;
  findOne(name: string): Promise<Tag>;
  findAll(): Promise<Tag[]>;
}
