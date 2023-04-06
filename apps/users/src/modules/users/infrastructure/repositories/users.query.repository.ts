import { Injectable } from "@nestjs/common";
import { UserEntity } from "../../domain/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersQueryRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async findUserById(id: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }
}
