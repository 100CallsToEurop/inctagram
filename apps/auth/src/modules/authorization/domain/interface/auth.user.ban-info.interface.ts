export interface IUserBanInfo {
  userId: string;
  isBanned: boolean;
  banDate: Date | null;
  banReason: string | null;
}
