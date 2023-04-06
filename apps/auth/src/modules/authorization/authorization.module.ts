import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthController } from "./api/auth.controller";
import {
  AuthLoginHandler,
  AuthLogoutHandler,
  AuthNewPasswordHandler,
  AuthPasswordRecoveryHandler,
  AuthRegistrationConfirmationHandler,
  AuthRegistrationEmailResendingHandler,
  AuthRegistrationHandler,
  AuthRefreshTokenHandler,
} from "./application/commands/handlers";
import {
  AuthUsersRepository,
  AuthUsersQueryRepository,
  AuthBadTokensRepository,
  AuthBadTokensQueryRepository,
} from "./infrastructure/repositories";
import {
  AddBadRefreshTokenHandler,
  AuthCreateUserHandler,
  AuthDeleteUserHandler,
  AuthSendEmailConfirmationMessageHandler,
  AuthSendPasswordRecoveryCodeHandler,
} from "./application/events/handler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokensModule } from "@utils/utils";
import {
  AuthBadTokensEntity,
  AuthUserEntity,
  UserBanInfoEntity,
  UserEmailConfirmationEntity,
  UserPasswordRecoveryEntity,
} from "./domain/entity";

const handlers = [
  AuthLoginHandler,
  AuthLogoutHandler,
  AuthNewPasswordHandler,
  AuthPasswordRecoveryHandler,
  AuthRegistrationConfirmationHandler,
  AuthRegistrationEmailResendingHandler,
  AuthRegistrationHandler,
  AuthRefreshTokenHandler,
  AddBadRefreshTokenHandler,
  AuthCreateUserHandler,
  AuthSendPasswordRecoveryCodeHandler,
  AuthSendEmailConfirmationMessageHandler,
  AuthDeleteUserHandler,
];
const adapters = [
  AuthUsersRepository,
  AuthUsersQueryRepository,
  AuthBadTokensRepository,
  AuthBadTokensQueryRepository,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      AuthBadTokensEntity,
      AuthUserEntity,
      UserBanInfoEntity,
      UserEmailConfirmationEntity,
      UserPasswordRecoveryEntity,
    ]),
    TokensModule,
  ],
  controllers: [AuthController],
  providers: [...handlers, ...adapters],
})
export class AuthorizationModule {}
