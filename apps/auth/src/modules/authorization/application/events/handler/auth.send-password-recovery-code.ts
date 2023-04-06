import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthSendPasswordRecoveryCodeEvent } from '../impl';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { SendNotificationContract } from '@amqp-contracts/amqp-contracts';

@EventsHandler(AuthSendPasswordRecoveryCodeEvent)
export class AuthSendPasswordRecoveryCodeHandler
  implements IEventHandler<AuthSendPasswordRecoveryCodeEvent>
{
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async handle({ email, recoveryCode }: AuthSendPasswordRecoveryCodeEvent) {
    const subject = 'Password recovery';
    const message = `${recoveryCode}`;

    await this.amqpConnection.publish(
      SendNotificationContract.queue.exchange.name,
      SendNotificationContract.queue.routingKey,
      { payload: { email, subject, message } }
    );
  }
}
