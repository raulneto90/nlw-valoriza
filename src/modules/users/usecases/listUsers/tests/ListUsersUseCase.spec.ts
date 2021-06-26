import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';

import { ListUsersUseCase } from '../ListUsersUseCase';

describe('ListUsersUseCase', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let listUsersUseCase: ListUsersUseCase;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUsersUseCase = new ListUsersUseCase(fakeUsersRepository);
  });

  it('should be able to list all users', async () => {
    await fakeUsersRepository.create({
      name: 'test',
      email: 'test@test.com',
      password: '123456',
    });

    const users = await listUsersUseCase.execute();

    expect.arrayContaining(users);
  });
});
