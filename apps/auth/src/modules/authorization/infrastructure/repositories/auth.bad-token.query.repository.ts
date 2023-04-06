import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthBadTokensEntity } from '../../domain/entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthBadTokensQueryRepository {
  constructor(
    @InjectRepository(AuthBadTokensEntity)
    private readonly authBadTokensRepository: Repository<AuthBadTokensEntity>
  ) {}

  async findBadToken(token: string): Promise<AuthBadTokensEntity> {
    return await this.authBadTokensRepository.findOneBy({ token });
  }
}
