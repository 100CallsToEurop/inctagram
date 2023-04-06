import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export namespace AuthRegistrationConfirmation {
  export const command = { cmd: "auth.regisration-confirmation" };

  export class Request {
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    code: string;
  }
}
