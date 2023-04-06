import { Controller, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';

import {
  AuthLogin,
  AuthLogout,
  AuthNewPassword,
  AuthPasswordRecovery,
  AuthRefreshToken,
  AuthRegistration,
  AuthRegistrationConfirmation,
  AuthRegistrationEmailResending,
} from '@lib/contracts/auth';
import {
  AuthUserLoginCommand,
  AuthLogoutCommand,
  AuthNewPasswordCommand,
  AuthPasswordRecoveryCommand,
  AuthRegistrationCommand,
  AuthRegistrationConfirmationCommand,
  AuthRegistrationEmailResendingCommand,
  AuthRefreshTokenCommand,
} from '../application/commands/impl';

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern(AuthLogin.command)
  async login(command: AuthLogin.Request): Promise<AuthLogin.Response> {
    this.logger.log(`login user - ${command.loginOrEmail}`);
    return await this.commandBus.execute(new AuthUserLoginCommand(command));
  }

  @MessagePattern(AuthLogout.command)
  async logout(command: AuthLogout.Request): Promise<void> {
    this.logger.log("Logout user");
    return await this.commandBus.execute(new AuthLogoutCommand(command));
  }

  @MessagePattern(AuthNewPassword.command)
  async newPassword(command: AuthNewPassword.Request): Promise<void> {
    this.logger.log("New Password user");
    return await this.commandBus.execute(new AuthNewPasswordCommand(command));
  }

  @MessagePattern(AuthPasswordRecovery.command)
  async passwordRecovery(command: AuthPasswordRecovery.Request): Promise<void> {
    this.logger.log(`Password recovery user - ${command.email}`);
    return await this.commandBus.execute(
      new AuthPasswordRecoveryCommand(command)
    );
  }

  @MessagePattern(AuthRegistrationConfirmation.command)
  async registrationConfirmation(
    command: AuthRegistrationConfirmation.Request
  ): Promise<void> {
    this.logger.log("Registration confirmation user");
    return await this.commandBus.execute(
      new AuthRegistrationConfirmationCommand(command)
    );
  }

  @MessagePattern(AuthRegistrationEmailResending.command)
  async emailResending(
    command: AuthRegistrationEmailResending.Request
  ): Promise<void> {
    this.logger.log(`Registration email resending user - ${command.email}`);
    return await this.commandBus.execute(
      new AuthRegistrationEmailResendingCommand(command)
    );
  }

  @MessagePattern(AuthRegistration.command)
  async registration(command: AuthRegistration.Request): Promise<void> {
    this.logger.log(`Registration user - ${command.email}`);
    return await this.commandBus.execute(new AuthRegistrationCommand(command));
  }

  @MessagePattern(AuthRefreshToken.command)
  async refreshToken(
    command: AuthRefreshToken.Request
  ): Promise<AuthRefreshToken.Response> {
    this.logger.log("Refresh token");
    return await this.commandBus.execute(new AuthRefreshTokenCommand(command));
  }
}
