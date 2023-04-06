import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @IsString()
  @ApiProperty()
  loginOrEmail: string;
  @IsString()
  @ApiProperty()
  password: string;
}
