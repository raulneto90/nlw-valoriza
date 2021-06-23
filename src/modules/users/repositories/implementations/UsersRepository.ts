import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/entities/User';
import { getRepository, Repository } from 'typeorm';

import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(data);

    await this.repository.save(user);

    return user;
  }

  findOne(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }
}
