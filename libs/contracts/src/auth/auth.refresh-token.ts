import { IsNotEmpty, IsString } from "class-validator";

export namespace AuthRefreshToken {
  export const command = { cmd: "auth.refresh-token" };

  export class Request {
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
  }

  export class Response {
    accessToken: string;
    refreshToken: string;
  }
}
