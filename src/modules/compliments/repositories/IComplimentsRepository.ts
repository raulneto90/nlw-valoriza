import { ICreateComplimentDTO } from '../dtos/ICreateComplimentDTO';
import { Compliment } from '../entities/Compliment';

export interface IComplimentsRepository {
  create(data: ICreateComplimentDTO): Promise<Compliment>;
}
