import { BaseRepository } from "@classes/classes/base.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthBadTokensEntity } from "../../domain/entity";

@Injectable()
export class AuthBadTokensRepository extends BaseRepository<AuthBadTokensEntity> {
  constructor(
    @InjectRepository(AuthBadTokensEntity)
    private readonly authBadTokensRepository: Repository<AuthBadTokensEntity>
  ) {
    super(authBadTokensRepository);
  }
}
