import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AuthLogoutCommand } from '../impl';
import { TokensService } from '@utils/utils';
import { AuthUsersQueryRepository } from '../../../infrastructure/repositories';

@CommandHandler(AuthLogoutCommand)
export class AuthLogoutHandler implements ICommandHandler<AuthLogoutCommand> {
  constructor(
    private readonly authUsersQueryRepository: AuthUsersQueryRepository,
    private readonly tokensService: TokensService,
    private publisher: EventPublisher
  ) {}
  async execute({ refreshToken }: AuthLogoutCommand): Promise<void> {
    const decodeToken = await this.tokensService.decodeToken(refreshToken);

    const user = this.publisher.mergeObjectContext(
      await this.authUsersQueryRepository.findUserById(decodeToken.userId)
    );

    user.addBadTokenEvent(refreshToken);
    user.commit();
  }
}
