import { AuthLogin } from "@lib/contracts/auth";

export class AuthUserLoginCommand {
  public loginOrEmail: string;
  public password: string;

  constructor(command: AuthLogin.Request) {
    this.loginOrEmail = command.loginOrEmail;
    this.password = command.password;
  }
}
