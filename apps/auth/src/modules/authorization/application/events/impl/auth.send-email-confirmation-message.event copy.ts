export class AuthSendEmailConfirmationMessageEvent {
  constructor(public email: string, public confirmationCode: string) {}
}
