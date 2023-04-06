import { IsNotEmpty, IsString } from 'class-validator';

export namespace AuthLogin {
  export const command = { cmd: 'auth.login' };

  export class Request {
    @IsNotEmpty()
    @IsString()
    loginOrEmail: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    // @IsNotEmpty()
    // @IsString()
    // ip: string;
    // @IsString()
    // @IsNotEmpty()
    // user_agent: string;
  }

  export class Response {
    accessToken: string;
    refreshToken: string;
  }
}
