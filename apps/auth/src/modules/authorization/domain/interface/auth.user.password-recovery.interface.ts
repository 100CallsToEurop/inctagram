export interface IUserPassworRecovery {
  userId: string;
  recoveryCode: string;
  expirationDate: Date;
  isCodeAlreadyUsed: boolean;
}
