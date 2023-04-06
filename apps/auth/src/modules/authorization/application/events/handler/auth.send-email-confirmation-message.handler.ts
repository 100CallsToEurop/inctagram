import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthSendEmailConfirmationMessageEvent } from '../impl';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { SendNotificationContract } from '@amqp-contracts/amqp-contracts';

@EventsHandler(AuthSendEmailConfirmationMessageEvent)
export class AuthSendEmailConfirmationMessageHandler
  implements IEventHandler<AuthSendEmailConfirmationMessageEvent>
{
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async handle({
    email,
    confirmationCode,
  }: AuthSendEmailConfirmationMessageEvent) {
    const subject = 'Email confirmation';
    const message = `${confirmationCode}`;

    await this.amqpConnection.publish(
      SendNotificationContract.queue.exchange.name,
      SendNotificationContract.queue.routingKey,
      { payload: { email, subject, message } }
    );
  }
}
