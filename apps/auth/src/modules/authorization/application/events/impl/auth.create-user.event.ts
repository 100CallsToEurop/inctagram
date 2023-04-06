export class AuthCreateUserEvent {
  constructor(
    public id: string,
    public login: string,
    public email: string,
  ) {}
}
