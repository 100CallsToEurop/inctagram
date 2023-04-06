import { CreateUserContract } from "@amqp-contracts/amqp-contracts/queues/user";

export class UsersCreateUserCommand {
  public id: string
  public login: string;
  public email: string;
  constructor({payload}: CreateUserContract.request) {
    this.id = payload.id;
    this.email = payload.email;
    this.login = payload.login;
  }
}
