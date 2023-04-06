import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthCreateUserEvent } from '../impl';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateUserContract } from '@amqp-contracts/amqp-contracts/queues/user';

@EventsHandler(AuthCreateUserEvent)
export class AuthCreateUserHandler
  implements IEventHandler<AuthCreateUserEvent>
{
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async handle(event: AuthCreateUserEvent) {
    await this.amqpConnection.publish(
      CreateUserContract.queue.exchange.name,
      CreateUserContract.queue.routingKey,
      { payload: event }
    );
    // await this.amqpConnection.publish(
    //   ReadContract.queue.exchange.name,
    //   ReadContract.queue.routingKey,
    //   { payload: { ...event, userId: event.id } }
    // );
  }
}
