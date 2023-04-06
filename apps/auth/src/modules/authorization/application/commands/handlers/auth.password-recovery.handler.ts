import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AuthPasswordRecoveryCommand } from "../impl";
import {
  AuthUsersQueryRepository,
  AuthUsersRepository,
} from "../../../infrastructure/repositories";
import { RpcException } from "@nestjs/microservices";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(AuthPasswordRecoveryCommand)
export class AuthPasswordRecoveryHandler
  implements ICommandHandler<AuthPasswordRecoveryCommand>
{
  constructor(
    private readonly authUsersQueryRepository: AuthUsersQueryRepository,
    private readonly authUsersRepository: AuthUsersRepository,
    private publisher: EventPublisher
  ) {}

  async execute({ email }: AuthPasswordRecoveryCommand): Promise<void> {
    const checkUser =
      await this.authUsersQueryRepository.findUserByLoginOrEmail(email);
    if (!checkUser) {
      throw new RpcException(new NotFoundException());
    }

    const user = await this.publisher.mergeObjectContext(
      await this.authUsersQueryRepository.findUserById(checkUser.id)
    );
    user.createPasswordRecovery();
    user.sendPasswordRecovery();
    user.commit();
    await this.authUsersRepository.save(user);
    
  }
}
