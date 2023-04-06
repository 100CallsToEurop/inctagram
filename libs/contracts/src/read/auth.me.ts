import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export namespace AuthMe {
  export const command = { cmd: "auth.me" };

  export class Request {
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    userId: string;
  }

  export class Response {
    userId: string;
    email: string;
    login: string;
  }
}
