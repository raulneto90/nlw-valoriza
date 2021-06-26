import { FakeTagsRepository } from '@modules/tags/repositories/fakes/FakeTagsRepository';

import { CreateTagUseCase } from '../../createTag/CreateTagUseCase';
import { ListTagsUseCase } from '../ListTagsUseCase';

describe('ListTagsUseCase', () => {
  let fakeTagsRepository: FakeTagsRepository;
  let createTagUseCase: CreateTagUseCase;
  let listTagsUseCase: ListTagsUseCase;

  beforeEach(() => {
    fakeTagsRepository = new FakeTagsRepository();
    createTagUseCase = new CreateTagUseCase(fakeTagsRepository);
    listTagsUseCase = new ListTagsUseCase(fakeTagsRepository);
  });

  it('should be able to list all tags', async () => {
    await createTagUseCase.execute({ name: 'test' });
    await createTagUseCase.execute({ name: 'test2' });
    await createTagUseCase.execute({ name: 'test3' });

    const tags = await listTagsUseCase.execute();

    expect.arrayContaining(tags);
  });
});
