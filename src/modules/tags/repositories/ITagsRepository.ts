import { ICreateTagDTO } from '@modules/dtos/ICreateTagDTO';

import { Tag } from '../entities/Tag';

export interface ITagsRepository {
  create(data: ICreateTagDTO): Promise<Tag>;
  findOne(name: string): Promise<Tag>;
}
