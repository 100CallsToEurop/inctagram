import { IsEmail, IsNotEmpty } from 'class-validator';

export class PasswordRecoveryDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
