import { AuthRegistrationEmailResending } from "@lib/contracts/auth";

export class AuthRegistrationEmailResendingCommand {
  public email: string;
  constructor(command: AuthRegistrationEmailResending.Request) {
    this.email = command.email;
  }
}
