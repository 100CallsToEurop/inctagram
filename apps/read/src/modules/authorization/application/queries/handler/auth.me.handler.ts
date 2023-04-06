import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuthMeQuery } from '../impl';
import { AuthMe } from '@lib/contracts/read';
import { ReadQueryRepository } from 'apps/read/src/modules/infrastructure/repositories';
import { RpcException } from '@nestjs/microservices';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(AuthMeQuery)
export class AuthMeHandler implements IQueryHandler<AuthMeQuery> {
  constructor(private readonly readRepository: ReadQueryRepository) {}

  async execute({ userId }: AuthMeQuery): Promise<AuthMe.Response> {
    const user = await this.readRepository.getMe(userId);
    if (!user) throw new RpcException(new NotFoundException('User not found'));

    return {
      userId: user.id,
      email: user.email,
      login: user.login,
    };
  }
}
