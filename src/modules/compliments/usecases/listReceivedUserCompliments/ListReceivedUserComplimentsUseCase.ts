import { Compliment } from '@modules/compliments/entities/Compliment';
import { IComplimentsRepository } from '@modules/compliments/repositories/IComplimentsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListReceivedUserComplimentsUseCase {
  constructor(
    @inject('ComplimentsRepository')
    private complimentsRepository: IComplimentsRepository,
  ) {}

  async execute(userID: string): Promise<Compliment[]> {
    const compliments = await this.complimentsRepository.findByReceiver(userID);

    return compliments;
  }
}
