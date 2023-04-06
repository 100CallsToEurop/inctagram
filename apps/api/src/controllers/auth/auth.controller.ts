import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/input/create-user.dto';
import { Request, Response } from 'express';
import { ConfirmationCodeDto } from './dto/input/confirmation-code.dto';
import { EmailResendDto } from './dto/input/email-resend.dto';
import { PasswordRecoveryDto } from './dto/input/password-recovery.dto';
import { UpdatePasswordDto } from './dto/input/update-password.dto';
import { AuthUserDataDto } from './dto/output/auth-user-data.dto';
import { firstValueFrom } from 'rxjs';
import { AuthCredentialsDto } from './dto/input/auth-credentials.dto';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard, JwtAuthRefreshGuard } from '@guards/guards';
import { CurrentUserId } from '@decorators/decorators';
import { AuthMe } from '@lib/contracts/read';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('READ_SERVICE') private readonly readClient: ClientProxy
  ) {}

  @Post('registration')
  @HttpCode(204)
  async registration(@Body() dto: CreateUserDto): Promise<void> {
    try {
      await firstValueFrom(
        this.authClient.send({ cmd: 'auth.regisration' }, dto)
      );
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: AuthCredentialsDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ accessToken: string }> {
    try {
      const {
        refreshToken,
        accessToken,
      }: { accessToken: string; refreshToken: string } = await firstValueFrom(
        this.authClient.send({ cmd: 'auth.login' }, dto)
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        //secure: true,
        maxAge: 180 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
      });

      return { accessToken };
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @UseGuards(JwtAuthRefreshGuard)
  @Post('refresh-token')
  @HttpCode(200)
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ accessToken: string }> {
    const refreshToken = req.cookies.refreshToken;
    try {
      const tokens: { accessToken: string; refreshToken: string } =
        await firstValueFrom(
          await this.authClient.send(
            { cmd: 'auth.refresh-token' },
            { refreshToken }
          )
        );
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        //secure: true,
        maxAge: 180 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
      });
      return { accessToken: tokens.accessToken };
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }

    // return { accessToken }
  }

  @UseGuards(JwtAuthRefreshGuard)
  @Post('logout')
  @HttpCode(204)
  async logout(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request
  ): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;
      await firstValueFrom(
        await this.authClient.emit({ cmd: 'auth.logout' }, { refreshToken })
      );
      res.clearCookie('refreshToken');
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Post('registration-confirmation')
  @HttpCode(204)
  async registrationConfirmation(
    @Body() dto: ConfirmationCodeDto
  ): Promise<void> {
    try {
      await firstValueFrom(
        await this.authClient.emit(
          { cmd: 'auth.regisration-confirmation' },
          dto
        )
      );
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Post('registration-email-resending')
  @HttpCode(204)
  async resendEmailConfirmationCode(
    @Body() dto: EmailResendDto
  ): Promise<void> {
    try {
      await firstValueFrom(
        await this.authClient.emit(
          { cmd: 'auth.regisration-email-resending' },
          dto
        )
      );
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Post('password-recovery')
  @HttpCode(204)
  async sendPasswordRecoveryCode(
    @Body() dto: PasswordRecoveryDto
  ): Promise<void> {
    try {
      await firstValueFrom(
        await this.authClient.emit({ cmd: 'auth.password-recovery' }, dto)
      );
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Post('new-password')
  @HttpCode(204)
  async updateUserPassword(@Body() dto: UpdatePasswordDto): Promise<void> {
    try {
      await firstValueFrom(
        await this.authClient.emit({ cmd: 'auth.new-password' }, dto)
      );
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getAuthUserData(
    @CurrentUserId() currentUserId: string
  ): Promise<AuthUserDataDto> {
    try {
      const authUserData: AuthUserDataDto = await firstValueFrom(
        await this.readClient.send(AuthMe.command, { userId: currentUserId })
      );
      return authUserData;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
