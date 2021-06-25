import { FakeComplimentsRepository } from '@modules/compliments/repositories/fakes/fakeComplimentsRepository';
import { FakeTagsRepository } from '@modules/tags/repositories/fakes/FakeTagsRepository';
import { CreateTagUseCase } from '@modules/tags/usecases/createTag/CreateTagUseCase';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { CreateUserUseCase } from '@modules/users/usecases/createUser/CreateUserUseCase';

import { AppError } from '@shared/errors/AppError';

import { CreateComplimentUseCase } from '../CreateComplimentUseCase';

describe('CreateComplimentUseCase', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeComplimentsRepository: FakeComplimentsRepository;
  let fakeTagsRepository: FakeTagsRepository;

  let createComplimentUseCase: CreateComplimentUseCase;
  let createUserUseCase: CreateUserUseCase;
  let createTagUseCase: CreateTagUseCase;

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTagsRepository = new FakeTagsRepository();
    fakeComplimentsRepository = new FakeComplimentsRepository();

    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
    createTagUseCase = new CreateTagUseCase(fakeTagsRepository);
    createComplimentUseCase = new CreateComplimentUseCase(
      fakeComplimentsRepository,
      fakeUsersRepository,
    );
  });

  const newUserAdmin = {
    name: 'Test',
    email: 'test@test.com.br',
    password: '123456',
    admin: true,
  };

  const newUser = {
    name: 'Test',
    email: 'test1@test.com.br',
    password: '123456',
  };

  const newTag = {
    name: 'Tag Example',
  };

  it('should be able to create a new compliment', async () => {
    const userAdmin = await createUserUseCase.execute(newUserAdmin);
    const user = await createUserUseCase.execute(newUser);
    const tag = await createTagUseCase.execute(newTag);

    const response = await createComplimentUseCase.execute({
      user_sender: userAdmin.id,
      user_receiver: user.id,
      tag_id: tag.id,
      message: 'Test compliment message',
    });

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('user_sender');
    expect(response).toHaveProperty('user_receiver');
    expect(response).toHaveProperty('tag_id');
    expect(response).toHaveProperty('message');

    expect(response.message).toBe('Test compliment message');
  });

  it('should not be able to create a new compliment with same user_sender', async () => {
    const user = await createUserUseCase.execute(newUser);
    const tag = await createTagUseCase.execute(newTag);

    await expect(
      createComplimentUseCase.execute({
        user_sender: user.id,
        user_receiver: user.id,
        tag_id: tag.id,
        message: 'Test compliment message',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new compliment with non existent user_receiver', async () => {
    const userAdmin = await createUserUseCase.execute(newUserAdmin);
    const tag = await createTagUseCase.execute(newTag);

    await expect(
      createComplimentUseCase.execute({
        user_sender: userAdmin.id,
        user_receiver: 'wrongUserID',
        tag_id: tag.id,
        message: 'Test compliment message',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
