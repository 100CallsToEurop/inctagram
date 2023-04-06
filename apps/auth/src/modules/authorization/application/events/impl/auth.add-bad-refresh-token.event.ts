export class AddBadTokenEvent {
  constructor(public readonly refreshToken: string) {}
}
