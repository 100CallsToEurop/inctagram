import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export namespace UsersDeleteUser {
  export const command = { cmd: "users.delete.user" };

  export class Request {
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    userId: string;
  }
}
