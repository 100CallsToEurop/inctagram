import { BaseEntityAgregate } from '@classes/classes';
import { Column, Entity } from 'typeorm';
import { UsersCreateUserCommand } from '../../application/commands/impl';

@Entity('USERS_USERS')
export class UserEntity extends BaseEntityAgregate {
  @Column({ unique: true })
  email: string;
  @Column({ unique: true, nullable: true })
  login: string;

  static create(command: UsersCreateUserCommand): UserEntity {
    const newUser = new UserEntity();
    newUser.id = command.id;
    newUser.email = command.email;
    newUser.login = command.login;
    return newUser;
  }
}
