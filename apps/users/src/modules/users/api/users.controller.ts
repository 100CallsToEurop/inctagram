import { Controller, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  UsersCreateUserCommand,
  UsersDeleteUserCommand,
} from '../application/commands/impl';
import {
  CreateUserContract,
  DeleteUserContract,
} from '@amqp-contracts/amqp-contracts/queues/user';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly commandBus: CommandBus) {}

  private errorHandler(error: any) {
    return {
      code: error?.name || 'error',
      message: error?.message || JSON.stringify(error),
    };
  }

  @RabbitSubscribe({
    exchange: CreateUserContract.queue.exchange.name,
    routingKey: CreateUserContract.queue.routingKey,
    queue: CreateUserContract.queue.queue,
  })
  async userCreate(
    request: CreateUserContract.request
  ): Promise<CreateUserContract.response> {
    const { payload, ...requestMessage } = request;
    try {
      this.logger.log(`User create user. UserId = ${payload.id}`);
      await this.commandBus.execute(new UsersCreateUserCommand(request));
    } catch (error) {
      this.logger.error(error);
      return {
        ...requestMessage,
        payload: null,
        error: this.errorHandler(error),
      };
    }
  }

  @RabbitSubscribe({
    exchange: DeleteUserContract.queue.exchange.name,
    routingKey: DeleteUserContract.queue.routingKey,
    queue: DeleteUserContract.queue.queue,
  })
  async userDelete(
    request: DeleteUserContract.request
  ): Promise<DeleteUserContract.response> {
    const { payload, ...requestMessage } = request;
    try {
      this.logger.log(`User create user. UserId = ${payload.userId}`);
      await this.commandBus.execute(new UsersDeleteUserCommand(request));
    } catch (error) {
      this.logger.error(error);
      return {
        ...requestMessage,
        payload: null,
        error: this.errorHandler(error),
      };
    }
  }
}
