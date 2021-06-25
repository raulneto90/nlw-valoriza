import authConfig from '@config/auth';
import { IAuthenticateUserDTO } from '@modules/users/dtos/IAuthenticateUserDTO';
import { IAuthenticateUserResponseDTO } from '@modules/users/dtos/IAuthenticateUserResponseDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IAuthenticateUserResponseDTO> {
    const user = await this.usersRepository.findOne(email);

    if (!user) throw new AppError('Email/password does not match!');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('Email/password does not match!');

    const token = sign({ email: user.email }, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });

    return { token };
  }
}
