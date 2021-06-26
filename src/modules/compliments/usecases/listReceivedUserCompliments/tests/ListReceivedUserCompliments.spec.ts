import { FakeComplimentsRepository } from '@modules/compliments/repositories/fakes/fakeComplimentsRepository';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';

import { CreateComplimentUseCase } from '../../createCompliment/CreateComplimentUseCase';
import { ListReceivedUserComplimentsUseCase } from '../ListReceivedUserComplimentsUseCase';

describe('ListReceivedUserCompliments', () => {
  let fakeComplimentsRepository: FakeComplimentsRepository;
  let fakeUsersRepository: FakeUsersRepository;
  let listReceivedUserComplimentsUseCase: ListReceivedUserComplimentsUseCase;
  let createComplimentUseCase: CreateComplimentUseCase;

  beforeEach(() => {
    fakeComplimentsRepository = new FakeComplimentsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    listReceivedUserComplimentsUseCase = new ListReceivedUserComplimentsUseCase(
      fakeComplimentsRepository,
    );
    createComplimentUseCase = new CreateComplimentUseCase(
      fakeComplimentsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to list received user compliments', async () => {
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

    const compliments = await listReceivedUserComplimentsUseCase.execute(
      user2.id,
    );

    expect.arrayContaining(compliments);
  });
});
