import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @Length(3, 10)
  @Matches('[a-zA-Z0-9_-]*$')
  @IsString()
  login: string;
  @Length(6, 20)
  @IsString()
  password: string;
}
