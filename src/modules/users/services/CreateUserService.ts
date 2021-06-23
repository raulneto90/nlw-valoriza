import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, admin }: ICreateUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findOne(email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const user = await this.usersRepository.create({ name, email, admin });

    return user;
  }
}
