import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findOne(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
