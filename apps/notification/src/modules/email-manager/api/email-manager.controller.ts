import { Controller, Logger } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { NotificationSendEmailMessageCommand } from "../application/commands/impl";
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { SendNotificationContract } from "@amqp-contracts/amqp-contracts";

@Controller("email-manager")
export class EmailManagerController {
  private readonly logger = new Logger(EmailManagerController.name);
  constructor(private readonly commandBus: CommandBus) {}

  private errorHandler(error: any) {
    return {
      code: error?.name || "error",
      message: error?.message || JSON.stringify(error),
    };
  }

  @RabbitSubscribe({
    exchange: SendNotificationContract.queue.exchange.name,
    routingKey: SendNotificationContract.queue.routingKey,
    queue: SendNotificationContract.queue.queue,
  })
  async sendEmailMessage(
    request: SendNotificationContract.request
  ): Promise<SendNotificationContract.response> {
    const { payload, ...requestMessage } = request;
    try {
      this.logger.log(`Send email message. Email ${payload.email}`);
      await this.commandBus.execute(
        new NotificationSendEmailMessageCommand(request)
      );
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
