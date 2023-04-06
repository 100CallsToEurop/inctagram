export class AuthSendPasswordRecoveryCodeEvent {
  constructor(public email: string, public recoveryCode: string) {}
}
