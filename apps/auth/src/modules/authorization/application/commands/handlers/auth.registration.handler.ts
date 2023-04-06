import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AuthRegistrationCommand } from '../impl';
import {
  AuthUsersQueryRepository,
  AuthUsersRepository,
} from '../../../infrastructure/repositories';
import { AuthUserEntity } from '../../../domain/entity';
import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(AuthRegistrationCommand)
export class AuthRegistrationHandler
  implements ICommandHandler<AuthRegistrationCommand>
{
  constructor(
    private readonly authUsersRepository: AuthUsersRepository,
    private readonly authUsersQueryRepository: AuthUsersQueryRepository,
    private publisher: EventPublisher
  ) {}

  async execute(command: AuthRegistrationCommand): Promise<void> {
    const { login, email } = command;

    const checkUserLogin =
      await this.authUsersQueryRepository.findUserByLoginOrEmail(login);

    const checkUserEmail =
      await this.authUsersQueryRepository.findUserByLoginOrEmail(email);

    const newUser = this.publisher.mergeObjectContext(
      AuthUserEntity.create(command)
    );

    if (checkUserLogin || checkUserEmail) {
      throw new RpcException(new BadRequestException('User already exists'));
    }
    newUser.createUser();
    newUser.sendEmailConfirmation();
    newUser.commit();

    await this.authUsersRepository.save(newUser);
  }
}
