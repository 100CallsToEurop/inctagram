import { BaseEntityAgregate } from '@classes/classes';
import { IAuthUser } from '../interface';
import {
  AuthSendEmailConfirmationMessageEvent,
  AuthDeleteUserEvent,
  AuthCreateUserEvent,
  AddBadTokenEvent,
  AuthSendPasswordRecoveryCodeEvent,
} from '../../application/events/impl';
import { Column, Entity, BeforeInsert, OneToOne } from 'typeorm';
import { AuthRegistrationCommand } from '../../application/commands/impl';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { hash } from 'bcrypt';
import { UserBanInfoEntity } from './auth.user.ban-info.entity';
import { UserEmailConfirmationEntity } from './auth.user.email-confirmation.entity';
import { UserPasswordRecoveryEntity } from './auth.user.passwordrecivery.entity';
import { add } from 'date-fns';
import {
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Entity('AUTH_Users')
export class AuthUserEntity extends BaseEntityAgregate implements IAuthUser {
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  login: string;
  @Column()
  passwordHash: string;

  @OneToOne(() => UserBanInfoEntity, (ban) => ban.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  banInfo: UserBanInfoEntity;

  @OneToOne(() => UserPasswordRecoveryEntity, (password) => password.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  passwordRecovery: UserPasswordRecoveryEntity;

  @OneToOne(() => UserEmailConfirmationEntity, (confirm) => confirm.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  emailConfirmation: UserEmailConfirmationEntity;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.passwordHash = await hash(this.passwordHash, 10);
  }

  confirmEmail(code: string): void {
    if (!this.isEmailCanBeConfirmed(code)) {
      throw new RpcException(
        new InternalServerErrorException("can't be confirmed")
      );
    }
    this.emailConfirmation.isConfirmed = true;
  }

  updateConfirmationCode(): void {
    this.emailConfirmation.confirmationCode = randomUUID();
    this.emailConfirmation.expirationDate = add(new Date(), { hours: 1 });
  }

  isEmailCanBeConfirmed(code: string): boolean {
    if (this.emailConfirmation.isConfirmed) return false;
    if (this.emailConfirmation.confirmationCode !== code) return false;
    if (this.emailConfirmation.expirationDate < new Date()) return false;
    return true;
  }

  updatePasswordHash(passworHash: string, passwordRecoveryCode: string): void {
    if (!this.isNewPasswordCanBeSet(passwordRecoveryCode)) {
      throw new RpcException(
        new InternalServerErrorException("This password hash can't be set")
      );
    }
    this.passwordHash = passworHash;
  }

  isNewPasswordCanBeSet(recoveryCode: string): boolean {
    if (this.passwordRecovery.isCodeAlreadyUsed) return false;
    if (this.passwordRecovery.recoveryCode !== recoveryCode) return false;
    if (this.passwordRecovery.expirationDate < new Date()) return false;
    return true;
  }

  createPasswordRecovery(): void {
    this.passwordRecovery.isCodeAlreadyUsed = false;
    this.passwordRecovery.recoveryCode = randomUUID();
    this.passwordRecovery.expirationDate = add(new Date(), { hours: 1 });
  }

  ban(banReason: string): void {
    this.banInfo.isBanned = true;
    this.banInfo.banDate = new Date();
    this.banInfo.banReason = banReason;
  }

  unBan(): void {
    this.banInfo.isBanned = false;
    this.banInfo.banDate = null;
    this.banInfo.banReason = null;
  }

  static create(command: AuthRegistrationCommand): AuthUserEntity {
    const user = new AuthUserEntity();
    user.id = randomUUID();
    user.email = command.email;
    user.login = command.login;
    user.passwordHash = command.password;

    const emailConfirmation = new UserEmailConfirmationEntity();
    emailConfirmation.id = randomUUID();
    emailConfirmation.userId = user.id;
    emailConfirmation.isConfirmed = false;
    emailConfirmation.confirmationCode = randomUUID();
    emailConfirmation.expirationDate = add(new Date(), { hours: 1 });
    user.emailConfirmation = emailConfirmation;

    const banInfo = new UserBanInfoEntity();
    banInfo.id = randomUUID();
    banInfo.userId = user.id;
    banInfo.isBanned = false;
    banInfo.banReason = null;
    banInfo.banDate = null;
    user.emailConfirmation = emailConfirmation;
    user.banInfo = banInfo;

    return user;
  }

  checkBan(): void {
    if (this.banInfo.isBanned) {
      throw new RpcException(new ForbiddenException());
    }
  }

  async isHashedEquals(password: string): Promise<{ userId: string }> {
    const isEqual = await bcrypt.compare(password, this.passwordHash);
    if (!isEqual) {
      throw new RpcException(new UnauthorizedException());
    }
    return { userId: this.id };
  }

  makePasswordRecoveryCodeUsed() {
    this.passwordRecovery.isCodeAlreadyUsed = true;
  }

  async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  //events

  sendPasswordRecovery(): void {
    this.apply(
      new AuthSendPasswordRecoveryCodeEvent(
        this.email,
        this.passwordRecovery.recoveryCode
      )
    );
  }

  sendEmailConfirmation(): void {
    this.apply(
      new AuthSendEmailConfirmationMessageEvent(
        this.email,
        this.emailConfirmation.confirmationCode
      )
    );
  }

  addBadTokenEvent(token: string): void {
    this.apply(new AddBadTokenEvent(token));
  }

  createUser(): void {
    this.apply(new AuthCreateUserEvent(this.id, this.login, this.email));
  }

  deleteUser(): void {
    this.apply(new AuthDeleteUserEvent(this.id));
  }
}
