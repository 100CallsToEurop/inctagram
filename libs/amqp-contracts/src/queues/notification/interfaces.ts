import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SendNotificationRequest {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  subject: string;
  @IsNotEmpty()
  @IsString()
  message: string;
}

export class SendNotificationResponse {}
