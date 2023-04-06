import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export namespace UsersCreateUser {
  export const command = { cmd: "users.create.user" };

  export class Request {
    @IsNotEmpty()
    @IsString()
    login: string;
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
  }
}
