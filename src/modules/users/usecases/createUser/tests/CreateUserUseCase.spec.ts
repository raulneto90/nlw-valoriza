import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';

import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../CreateUserUseCase';

describe('CreateUserUseCase', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const newUser = {
      name: 'Test',
      email: 'test@test.com.br',
      password: '123456',
    };

    const user = await createUserUseCase.execute(newUser);

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
  });

  it('should not be able to create an existent user', async () => {
    const newUser = {
      name: 'Test',
      email: 'test@test.com.br',
      password: '123456',
    };

    await createUserUseCase.execute(newUser);
    await expect(createUserUseCase.execute(newUser)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
