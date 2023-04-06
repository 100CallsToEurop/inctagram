import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export namespace AuthRegistrationEmailResending {
  export const command = { cmd: "auth.regisration-email-resending" };

  export class Request {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
   
  }
}
