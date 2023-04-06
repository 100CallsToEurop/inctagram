import { AuthLogout } from "@lib/contracts/auth";

export class AuthLogoutCommand {
  public refreshToken: string;
  constructor(command: AuthLogout.Request) {
    this.refreshToken = command.refreshToken;
  }
}
