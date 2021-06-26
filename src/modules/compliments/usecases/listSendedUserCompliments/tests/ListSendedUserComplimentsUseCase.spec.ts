import { FakeComplimentsRepository } from '@modules/compliments/repositories/fakes/fakeComplimentsRepository';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';

import { CreateComplimentUseCase } from '../../createCompliment/CreateComplimentUseCase';
import { ListSendedUserComplimentsUseCase } from '../ListSendedUserComplimentsUseCase';

describe('ListSendedUserCompliments', () => {
  let fakeComplimentsRepository: FakeComplimentsRepository;
  let fakeUsersRepository: FakeUsersRepository;
  let listSendedUserComplimentsUseCase: ListSendedUserComplimentsUseCase;
  let createComplimentUseCase: CreateComplimentUseCase;

  beforeEach(() => {
    fakeComplimentsRepository = new FakeComplimentsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    listSendedUserComplimentsUseCase = new ListSendedUserComplimentsUseCase(
      fakeComplimentsRepository,
    );
    createComplimentUseCase = new CreateComplimentUseCase(
      fakeComplimentsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to list sended user compliments', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test2@test.com',
      password: '123456',
    });

    await createComplimentUseCase.execute({
      message: 'test',
      user_sender: user.id,
      user_receiver: user2.id,
      tag_id: '123123',
    });

    await createComplimentUseCase.execute({
      message: 'test',
      user_sender: user.id,
      user_receiver: user2.id,
      tag_id: '321321',
    });

    const compliments = await listSendedUserComplimentsUseCase.execute(user.id);

    expect.arrayContaining(compliments);
  });
});
