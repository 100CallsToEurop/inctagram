import { IsUUID } from 'class-validator';

export class ConfirmationCodeDto {
  @IsUUID()
  code: string;
}
