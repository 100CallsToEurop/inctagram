import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateUserRequest {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsNotEmpty()
  @IsString()
  login: string;
}

export class CreateUserResponse {}

export class DeleteUserRequest {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}

export class DeleteUserResponse {}
