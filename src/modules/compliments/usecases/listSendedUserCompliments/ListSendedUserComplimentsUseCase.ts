import { Compliment } from '@modules/compliments/entities/Compliment';
import { IComplimentsRepository } from '@modules/compliments/repositories/IComplimentsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListSendedUserComplimentsUseCase {
  constructor(
    @inject('ComplimentsRepository')
    private complimentsRepository: IComplimentsRepository,
  ) {}

  async execute(userID: string): Promise<Compliment[]> {
    const compliments = await this.complimentsRepository.findBySender(userID);

    return compliments;
  }
}
