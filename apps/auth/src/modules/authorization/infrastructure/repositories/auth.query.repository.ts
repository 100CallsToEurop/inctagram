import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthUserEntity } from "../../domain/entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthUsersQueryRepository {
  constructor(
    @InjectRepository(AuthUserEntity)
    private readonly authUsersRepository: Repository<AuthUserEntity>
  ) {}

  async findUserByLoginOrEmail(loginOrEmail: string): Promise<AuthUserEntity> {
    return await this.authUsersRepository.findOne({
      where: [{ login: loginOrEmail }, { email: loginOrEmail }],
      relations: { banInfo: true, passwordRecovery: true, emailConfirmation: true },
    });
  }

  findUserByEmailConfirmationCode(
    code: string
  ): Promise<AuthUserEntity | null> {
    return this.authUsersRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.emailConfirmation", "UserEmailConfirmation")
      .where("UserEmailConfirmation.confirmationCode = :code", { code: code })
      .getOne();
  }

  async findUserByRecoveryCode(recoveryCode: string): Promise<AuthUserEntity> {
    return await this.authUsersRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.passwordRecovery", "passwordRecovery")
      .where("passwordRecovery.recoveryCode = :recoveryCode", { recoveryCode })
      .getOne();
  }

  async findUserById(id: string): Promise<AuthUserEntity> {
    return await this.authUsersRepository.findOne({
      where: { id },
      relations: { banInfo: true, passwordRecovery: true, emailConfirmation: true },
    });
  }
}
