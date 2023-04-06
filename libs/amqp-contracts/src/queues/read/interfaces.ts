import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserViewRequest {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsNotEmpty()
  @IsString()
  login: string;
}

export class CreateUserViewResponse {}
