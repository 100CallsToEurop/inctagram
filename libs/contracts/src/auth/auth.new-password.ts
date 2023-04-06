import { IsNotEmpty, IsString, Length } from "class-validator";

export namespace AuthNewPassword {
  export const command = { cmd: "auth.new-password" };

  export class Request {
    @IsNotEmpty()
    @Length(6, 20)
    @IsString()
    newPassword: string;

    @IsNotEmpty()
    @IsString()
    recoveryCode: string;
  }
}
