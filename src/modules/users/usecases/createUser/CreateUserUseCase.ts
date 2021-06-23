import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, admin }: ICreateUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findOne(email);

    if (userExists) {
      throw new AppError('User already exists');
    }

    const user = await this.usersRepository.create({ name, email, admin });

    return user;
  }
}
