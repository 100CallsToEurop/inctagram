import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AuthRegistrationEmailResendingCommand } from "../impl";
import { AuthUsersQueryRepository, AuthUsersRepository } from "../../../infrastructure/repositories";
import { RpcException } from "@nestjs/microservices";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(AuthRegistrationEmailResendingCommand)
export class AuthRegistrationEmailResendingHandler
  implements ICommandHandler<AuthRegistrationEmailResendingCommand>
{
  constructor(
    private readonly authUsersQueryRepository: AuthUsersQueryRepository,
    private readonly authUsersRepository: AuthUsersRepository,
    private publisher: EventPublisher
  ) {}
  
  async execute({
    email,
  }: AuthRegistrationEmailResendingCommand): Promise<void> {
    const checkUser =
      await this.authUsersQueryRepository.findUserByLoginOrEmail(email);
    if (!checkUser) {
      throw new RpcException(new NotFoundException());
    }

    const user = await this.publisher.mergeObjectContext(
      await this.authUsersQueryRepository.findUserById(checkUser.id)
    );
    user.updateConfirmationCode();
    user.sendEmailConfirmation();
    user.commit();
    await this.authUsersRepository.save(user);
  }
}
