import { BaseEntity } from '@classes/classes';
import { randomUUID } from 'crypto';
import { Column, Entity } from 'typeorm';
import { AddBadTokenEvent } from '../../application/events/impl';

@Entity('AUTH_BadTokens')
export class AuthBadTokensEntity extends BaseEntity {
  @Column()
  token: string;

  static create(event: AddBadTokenEvent): AuthBadTokensEntity {
    const badToken = new AuthBadTokensEntity();
    badToken.id = randomUUID();
    badToken.token = event.refreshToken;
    return badToken;
  }
}
