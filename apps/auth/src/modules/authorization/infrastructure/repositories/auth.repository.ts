import { BaseRepository } from "@classes/classes/base.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthUserEntity } from "../../domain/entity";

@Injectable()
export class AuthUsersRepository extends BaseRepository<AuthUserEntity> {
  constructor(
    @InjectRepository(AuthUserEntity)
    private readonly authUsersRepository: Repository<AuthUserEntity>
  ) {
    super(authUsersRepository);
  }
}
