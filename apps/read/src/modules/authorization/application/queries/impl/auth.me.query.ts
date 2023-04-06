import { AuthMe } from "@lib/contracts/read";

export class AuthMeQuery {
  public userId: string;

  constructor(query: AuthMe.Request) {
    this.userId = query.userId;
  }
}
