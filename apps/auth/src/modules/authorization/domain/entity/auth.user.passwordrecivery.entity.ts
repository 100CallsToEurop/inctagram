import { BaseEntity } from '@classes/classes';
import { IUserPassworRecovery } from '../interface';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AuthUserEntity } from './auth.user.entity';

@Entity('AUTH_UsersPasswordRecovery')
export class UserPasswordRecoveryEntity
  extends BaseEntity
  implements IUserPassworRecovery
{
  @Column('uuid')
  userId: string;
  @Column()
  recoveryCode: string;
  @Column()
  expirationDate: Date;
  @Column()
  isCodeAlreadyUsed: boolean;

  @OneToOne(() => AuthUserEntity, (user) => user.passwordRecovery, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: AuthUserEntity;
}
