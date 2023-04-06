import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export namespace AuthRegistration {
  export const command = { cmd: "auth.regisration" };

  export class Request {
    @IsNotEmpty()
    @IsString()
    login: string;
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
  }
}
