import { BaseEntity } from '@classes/classes';
import { IUserEmailConfirmation } from '../interface';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AuthUserEntity } from './auth.user.entity';

@Entity('AUTH_UserEmailConfirmation')
export class UserEmailConfirmationEntity
  extends BaseEntity
  implements IUserEmailConfirmation
{
  @Column('uuid')
  userId: string;
  @Column()
  confirmationCode: string;
  @Column()
  expirationDate: Date;
  @Column()
  isConfirmed: boolean;

  @OneToOne(() => AuthUserEntity, (user) => user.emailConfirmation, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: AuthUserEntity;
}
