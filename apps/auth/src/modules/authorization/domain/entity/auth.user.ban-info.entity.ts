import { BaseEntity } from '@classes/classes';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { IUserBanInfo } from '../interface';
import { AuthUserEntity } from './auth.user.entity';

@Entity('AUTH_UsersBanInfo')
export class UserBanInfoEntity extends BaseEntity implements IUserBanInfo {
  @Column('uuid')
  userId: string;
  @Column()
  isBanned: boolean;
  @Column({ nullable: true })
  banDate: Date;
  @Column({ nullable: true })
  banReason: string;

  @OneToOne(() => AuthUserEntity, (user) => user.banInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: AuthUserEntity;
}
