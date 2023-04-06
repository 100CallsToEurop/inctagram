import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotificationSendEmailMessageCommand } from "../impl";
import { EmailAdapter } from "../../../infrastructure/adapters";
import { Logger } from "@nestjs/common";

@CommandHandler(NotificationSendEmailMessageCommand)
export class NotificationSendEmailMessageHandler
  implements ICommandHandler<NotificationSendEmailMessageCommand>
{
  private readonly logger = new Logger(
    NotificationSendEmailMessageHandler.name
  );
  constructor(private emailAdapter: EmailAdapter) {}

  async execute(command: NotificationSendEmailMessageCommand): Promise<void> {
    const { email, subject, message } = command;
    try {
      this.logger.log('Send message');
      await this.emailAdapter.sendEmail(email, subject, message);
    } catch (error) {
      this.logger.error(error.message);
      return error
    }
  }
}
