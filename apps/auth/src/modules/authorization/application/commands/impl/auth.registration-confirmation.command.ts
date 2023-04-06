import { AuthRegistrationConfirmation } from "@lib/contracts/auth";

export class AuthRegistrationConfirmationCommand {
  public code: string;
  constructor(command: AuthRegistrationConfirmation.Request) {
    this.code = command.code;
  }
}
