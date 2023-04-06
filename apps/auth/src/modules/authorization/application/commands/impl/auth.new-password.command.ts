import { AuthNewPassword } from "@lib/contracts/auth";

export class AuthNewPasswordCommand {
  public newPassword: string;
  public recoveryCode: string;
  constructor(command: AuthNewPassword.Request) {
    this.newPassword = command.newPassword;
    this.recoveryCode = command.recoveryCode;
  }
}
