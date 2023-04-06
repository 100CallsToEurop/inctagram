import { Controller, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ReadContract } from '@amqp-contracts/amqp-contracts/queues/read';
import { SetMeCommand } from '../application/commands/set.me';
import { CommandBus } from '@nestjs/cqrs';

@Controller('read')
export class ReadCreateController {
  private readonly logger = new Logger(ReadCreateController.name);

  constructor(private readonly commandBus: CommandBus) {}

  private errorHandler(error: any) {
    return {
      code: error?.name || 'error',
      message: error?.message || JSON.stringify(error),
    };
  }

  @RabbitSubscribe({
    exchange: ReadContract.queue.exchange.name,
    routingKey: ReadContract.queue.routingKey,
    queue: ReadContract.queue.queue,
  })
  async createUserView(request: ReadContract.request) {
    const { payload, ...requestMessage } = request;
    try {
      this.logger.log(`createUserView. UserId = ${payload.id}`);
      await this.commandBus.execute(new SetMeCommand(request));
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
