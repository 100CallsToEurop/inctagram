import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export namespace AuthLogout {
  export const command = { cmd: 'auth.logout' };

  export class Request {
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
  }
}
