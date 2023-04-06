import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { RpcException } from "@nestjs/microservices";
import { UnauthorizedException } from "@nestjs/common";

import { AuthLogin } from "@lib/contracts/auth";
import { TokensService } from "@utils/utils";
import { AuthUserLoginCommand } from "../impl";
import {
  AuthUsersQueryRepository,
  AuthUsersRepository,
} from "../../../infrastructure/repositories";

@CommandHandler(AuthUserLoginCommand)
export class AuthLoginHandler implements ICommandHandler<AuthUserLoginCommand> {
  constructor(
    private readonly tokensService: TokensService,
    private readonly authUsersQueryRepository: AuthUsersQueryRepository,
    private readonly authUsersRepository: AuthUsersRepository
  ) {}

  async execute(command: AuthUserLoginCommand): Promise<AuthLogin.Response> {
    const { loginOrEmail, password } = command;

    const user = await this.authUsersQueryRepository.findUserByLoginOrEmail(
      loginOrEmail
    );
    if (!user) {
      throw new RpcException(new UnauthorizedException());
    }
    user.checkBan();
    const payload = await user.isHashedEquals(password);
    const newTokens = await this.tokensService.createNewTokens(payload);
    await this.authUsersRepository.save(user);
    return newTokens;
  }
}
