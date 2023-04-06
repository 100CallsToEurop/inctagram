import { DeleteUserContract } from "@amqp-contracts/amqp-contracts/queues/user";

export class UsersDeleteUserCommand {
  public userId: string;
  constructor({payload}: DeleteUserContract.request) {
    this.userId = payload.userId;
  }
}
