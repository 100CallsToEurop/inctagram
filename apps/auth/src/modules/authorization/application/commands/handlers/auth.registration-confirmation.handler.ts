import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AuthRegistrationConfirmationCommand } from "../impl";
import {
  AuthUsersQueryRepository,
  AuthUsersRepository,
} from "../../../infrastructure/repositories";
import { RpcException } from "@nestjs/microservices";
import { BadRequestException, NotFoundException } from "@nestjs/common";

@CommandHandler(AuthRegistrationConfirmationCommand)
export class AuthRegistrationConfirmationHandler
  implements ICommandHandler<AuthRegistrationConfirmationCommand>
{
  constructor(
    private readonly authUsersQueryRepository: AuthUsersQueryRepository,
    private readonly authUsersRepository: AuthUsersRepository
  ) {}

  async execute({ code }: AuthRegistrationConfirmationCommand): Promise<void> {
    const user =
      await this.authUsersQueryRepository.findUserByEmailConfirmationCode(code);
    if (!user) {
      throw new RpcException(new NotFoundException());
    }
    if (!user.isEmailCanBeConfirmed(code)) {
      throw new RpcException(new BadRequestException());
    }
    user.confirmEmail(code);
    await this.authUsersRepository.save(user);
  }
}
