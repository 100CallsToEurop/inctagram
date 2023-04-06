import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export namespace AuthPasswordRecovery {
  export const command = { cmd: "auth.password-recovery" };

  export class Request {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
  }
}
