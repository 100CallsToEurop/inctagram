import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { EmailAdapter } from "./infrastructure/adapters";
import { NotificationSendEmailMessageHandler } from "./application/commands/handlers";
import { EmailManagerController } from "./api/email-manager.controller";

const handlers = [NotificationSendEmailMessageHandler];
const adapters = [EmailAdapter];

@Module({
  imports: [CqrsModule],
  controllers: [EmailManagerController],
  providers: [...handlers, ...adapters],
})
export class EmailManagerModule {}
