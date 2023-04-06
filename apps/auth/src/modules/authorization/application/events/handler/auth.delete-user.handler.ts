import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AuthDeleteUserEvent } from "../impl";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { DeleteUserContract } from "@amqp-contracts/amqp-contracts/queues/user";

@EventsHandler(AuthDeleteUserEvent)
export class AuthDeleteUserHandler
  implements IEventHandler<AuthDeleteUserEvent>
{
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async handle(event: AuthDeleteUserEvent) {
    await this.amqpConnection.publish(
      DeleteUserContract.queue.exchange.name,
      DeleteUserContract.queue.routingKey,
      { payload: event }
    );
  }
}
