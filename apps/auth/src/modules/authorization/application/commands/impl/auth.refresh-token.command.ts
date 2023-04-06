import { AuthRefreshToken } from "@lib/contracts/auth";

export class AuthRefreshTokenCommand {
  public refreshToken: string;
  constructor(command: AuthRefreshToken.Request) {
    this.refreshToken = command.refreshToken
  }
}
