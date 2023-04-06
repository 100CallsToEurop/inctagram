import { AuthPasswordRecovery } from "@lib/contracts/auth";

export class AuthPasswordRecoveryCommand {
  public email: string;
  constructor(command: AuthPasswordRecovery.Request) {
    this.email = command.email;
  }
}
