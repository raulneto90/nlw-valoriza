import { ICreateComplimentDTO } from '@modules/compliments/dtos/ICreateComplimentDTO';
import { Compliment } from '@modules/compliments/entities/Compliment';
import { IComplimentsRepository } from '@modules/compliments/repositories/IComplimentsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateComplimentUseCase {
  constructor(
    @inject('ComplimentsRepository')
    private complimentsRepository: IComplimentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    user_receiver,
    message,
    tag_id,
    user_sender,
  }: ICreateComplimentDTO): Promise<Compliment> {
    const userReceiverExists = await this.usersRepository.findById(
      user_receiver,
    );

    if (user_sender === user_receiver) {
      throw new AppError('User Sender and User Receiver cannot be the same!');
    }

    if (!userReceiverExists) {
      throw new AppError('User Receiver does not exists', 404);
    }

    const compliment = await this.complimentsRepository.create({
      user_receiver,
      user_sender,
      tag_id,
      message,
    });

    return compliment;
  }
}
