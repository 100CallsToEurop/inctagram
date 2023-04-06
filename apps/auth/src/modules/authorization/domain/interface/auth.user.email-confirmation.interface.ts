export interface IUserEmailConfirmation {
    userId: string
    confirmationCode: string
    expirationDate: Date
    isConfirmed: boolean
}
