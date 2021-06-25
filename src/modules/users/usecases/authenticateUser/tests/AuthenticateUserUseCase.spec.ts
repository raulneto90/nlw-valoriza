import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';

import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from '../AuthenticateUserUseCase';

describe('AuthenticateUserUseCase', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let createUserUseCase: CreateUserUseCase;
  let authenticateUserUseCase: AuthenticateUserUseCase;

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(fakeUsersRepository);
  });

  it('should be able to authenticate an user', async () => {
    const newUser = {
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    };

    await createUserUseCase.execute(newUser);

    const response = await authenticateUserUseCase.execute({
      email: newUser.email,
      password: newUser.password,
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate an user with wrong e-mail', async () => {
    const newUser = {
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    };

    await createUserUseCase.execute(newUser);

    await expect(
      authenticateUserUseCase.execute({
        email: 'wrongEmail',
        password: newUser.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with wrong password', async () => {
    const newUser = {
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    };

    await createUserUseCase.execute(newUser);

    await expect(
      authenticateUserUseCase.execute({
        email: newUser.email,
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
