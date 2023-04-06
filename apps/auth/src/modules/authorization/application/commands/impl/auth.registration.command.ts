import { AuthRegistration } from "@lib/contracts/auth";

export class AuthRegistrationCommand {
  public login: string;
  public email: string;
  public password: string;
  constructor(command: AuthRegistration.Request) {
    this.login = command.login;
    this.email = command.email;
    this.password = command.password;
  }
}