import {
  AuthCreateUserEvent,
  AuthDeleteUserEvent,
  AuthSendEmailConfirmationMessageEvent,
} from "../../application/events/impl";

export interface IAuthUser {
  email: string;
  login: string;
  passwordHash: string;

  hashPassword(): Promise<void>;

  confirmEmail(code: string): void;
  updateConfirmationCode(): void;
  isEmailCanBeConfirmed(code: string): boolean;

  updatePasswordHash(passworHash: string, passwordRecoveryCode: string): void;

  isNewPasswordCanBeSet(recoveryCode: string): boolean;

  createPasswordRecovery(): void;


  ban(banReason: string): void;
  unBan(): void;

  //events
  createUser(event: AuthCreateUserEvent): void;
  sendEmailConfirmation(event: AuthSendEmailConfirmationMessageEvent): void;
  deleteUser(event: AuthDeleteUserEvent): void;
}
