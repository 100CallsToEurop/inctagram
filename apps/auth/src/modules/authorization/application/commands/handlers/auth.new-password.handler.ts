import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AuthNewPasswordCommand } from "../impl";
import {
  AuthUsersQueryRepository,
  AuthUsersRepository,
} from "../../../infrastructure/repositories";
import { RpcException } from "@nestjs/microservices";
import { ForbiddenException, NotFoundException } from "@nestjs/common";

@CommandHandler(AuthNewPasswordCommand)
export class AuthNewPasswordHandler
  implements ICommandHandler<AuthNewPasswordCommand>
{
  constructor(
    private readonly authUsersQueryRepository: AuthUsersQueryRepository,
    private readonly authUsersRepository: AuthUsersRepository
  ) {}
  async execute({
    newPassword,
    recoveryCode,
  }: AuthNewPasswordCommand): Promise<void> {
    const user = await this.authUsersQueryRepository.findUserByRecoveryCode(
      recoveryCode
    );
    if (!user) {
      throw new RpcException(new NotFoundException());
    }
    if (!user.isNewPasswordCanBeSet(recoveryCode))
      throw new RpcException(new ForbiddenException());

    const newPasswordHash = await user.generateHash(newPassword);

    user.updatePasswordHash(newPasswordHash, recoveryCode);
    user.makePasswordRecoveryCodeUsed();
    await this.authUsersRepository.save(user);
  }
}
