import { ICreateComplimentDTO } from '@modules/compliments/dtos/ICreateComplimentDTO';
import { Compliment } from '@modules/compliments/entities/Compliment';

import { IComplimentsRepository } from '../IComplimentsRepository';

export class FakeComplimentsRepository implements IComplimentsRepository {
  private compliments: Compliment[];

  constructor() {
    this.compliments = [];
  }

  async create(data: ICreateComplimentDTO): Promise<Compliment> {
    const compliment = new Compliment();

    Object.assign(compliment, data);

    this.compliments.push(compliment);

    return compliment;
  }
}
