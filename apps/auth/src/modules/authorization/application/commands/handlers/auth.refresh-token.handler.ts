import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AuthRefreshTokenCommand } from '../impl';
import { TokensService } from '@utils/utils';
import { RpcException } from '@nestjs/microservices';
import { UnauthorizedException } from '@nestjs/common';
import {
  AuthBadTokensQueryRepository,
  AuthUsersQueryRepository,
  AuthUsersRepository,
} from '../../../infrastructure/repositories';

@CommandHandler(AuthRefreshTokenCommand)
export class AuthRefreshTokenHandler
  implements ICommandHandler<AuthRefreshTokenCommand>
{
  constructor(
    private readonly badTokensQueryRepository: AuthBadTokensQueryRepository,
    private readonly authUsersRepository: AuthUsersRepository,
    private readonly authUsersQueryRepository: AuthUsersQueryRepository,
    private readonly tokensService: TokensService,
    private publisher: EventPublisher
  ) {}

  async execute({ refreshToken }: AuthRefreshTokenCommand): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const checkToken = await this.badTokensQueryRepository.findBadToken(
      refreshToken
    );
    if (checkToken) {
      throw new RpcException(new UnauthorizedException());
    }

    const decodeToken = await this.tokensService.decodeToken(refreshToken);

    const user = this.publisher.mergeObjectContext(
      await this.authUsersQueryRepository.findUserById(decodeToken.userId)
    );

    user.checkBan();

    const newTokens = await this.tokensService.createNewTokens({
      userId: decodeToken.userId,
    });

    user.addBadTokenEvent(refreshToken);
    user.commit();

    await this.authUsersRepository.save(user);
    return newTokens;
  }
}
