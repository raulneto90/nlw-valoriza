import { FakeTagsRepository } from '@modules/tags/repositories/fakes/FakeTagsRepository';

import { AppError } from '@shared/errors/AppError';

import { CreateTagUseCase } from '../CreateTagUseCase';

describe('CreateTagUseCase', () => {
  let fakeTagsRepository: FakeTagsRepository;
  let createTagUseCase: CreateTagUseCase;

  beforeEach(async () => {
    fakeTagsRepository = new FakeTagsRepository();
    createTagUseCase = new CreateTagUseCase(fakeTagsRepository);
  });

  it('should be able to create a new tag', async () => {
    const newTag = {
      name: 'Test tag',
    };

    const tag = await createTagUseCase.execute(newTag);

    expect(tag).toHaveProperty('id');
    expect(tag).toHaveProperty('name');
  });

  it('should not be able to create an existent tag', async () => {
    const newTag = {
      name: 'Test tag',
    };

    await createTagUseCase.execute(newTag);
    await expect(createTagUseCase.execute(newTag)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
