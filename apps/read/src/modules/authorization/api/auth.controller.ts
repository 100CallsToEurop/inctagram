import { Controller, Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';

import { AuthMe } from '@lib/contracts/read';
import { AuthMeQuery } from '../application/queries/impl';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @MessagePattern(AuthMe.command)
  async login(query: AuthMe.Request): Promise<AuthMe.Response> {
    this.logger.log(`get user - ${query.userId}`);
    return await this.queryBus.execute(new AuthMeQuery(query));
  }
}
