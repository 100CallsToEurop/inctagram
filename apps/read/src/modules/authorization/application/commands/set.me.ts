import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReadRepository } from '../../../infrastructure/repositories';
import { ReadContract } from '@amqp-contracts/amqp-contracts/queues/read';

export class SetMeCommand {
  public id: string;
  public login: string;
  public email: string;
  constructor({ payload }: ReadContract.request) {
    this.id = payload.id;
    this.login = payload.login;
    this.email = payload.email;
  }
}

@CommandHandler(SetMeCommand)
export class SetMeHandler implements ICommandHandler<SetMeCommand> {
  constructor(private readRepository: ReadRepository) {}
  async execute(command: SetMeCommand): Promise<void> {
    await this.readRepository.createUserMe(
      command.id,
      command.email,
      command.login
    );
  }
}
