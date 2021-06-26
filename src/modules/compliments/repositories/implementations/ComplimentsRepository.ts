import { ICreateComplimentDTO } from '@modules/compliments/dtos/ICreateComplimentDTO';
import { Compliment } from '@modules/compliments/entities/Compliment';
import { getRepository, Repository } from 'typeorm';

import { IComplimentsRepository } from '../IComplimentsRepository';

export class ComplimentsRepository implements IComplimentsRepository {
  private repository: Repository<Compliment>;

  constructor() {
    this.repository = getRepository(Compliment);
  }

  async create(data: ICreateComplimentDTO): Promise<Compliment> {
    const compliment = this.repository.create(data);

    await this.repository.save(compliment);

    return compliment;
  }

  async findBySender(userID: string): Promise<Compliment[]> {
    return this.repository.find({
      where: { user_receiver: userID },
      relations: ['userSender', 'tag'],
    });
  }

  async findByReceiver(userID: string): Promise<Compliment[]> {
    return this.repository.find({
      where: { user_receiver: userID },
      relations: ['userSender', 'tag'],
    });
  }
}
