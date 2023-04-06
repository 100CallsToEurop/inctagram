import { SendNotificationContract } from "@amqp-contracts/amqp-contracts";

export class NotificationSendEmailMessageCommand {
  public email: string;
  public subject: string
  public message: string;
  constructor({payload}: SendNotificationContract.request) {
    this.email = payload.email;
    this.subject = payload.subject
    this.message = payload.message;
  }
}