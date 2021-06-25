import { IComplimentsRepository } from '@modules/compliments/repositories/IComplimentsRepository';
import { ComplimentsRepository } from '@modules/compliments/repositories/implementations/ComplimentsRepository';
import { TagsRepository } from '@modules/tags/repositories/implementations/TagsRepository';
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository';
import { UsersRepository } from '@modules/users/repositories/implementations/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);

container.registerSingleton<IComplimentsRepository>(
  'ComplimentsRepository',
  ComplimentsRepository,
);
