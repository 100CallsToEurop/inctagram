import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UsersCreateUserCommand } from "../impl";
import { RpcException } from "@nestjs/microservices";
import { BadRequestException } from "@nestjs/common";
import { UserEntity } from "../../../domain/entities/user.entity";
import {
  UsersQueryRepository,
  UsersRepository,
} from "../../../infrastructure/repositories";

@CommandHandler(UsersCreateUserCommand)
export class UsersCreateUserHandler
  implements ICommandHandler<UsersCreateUserCommand>
{
  constructor(
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async execute(command: UsersCreateUserCommand) {
    const checkUserById = await this.usersQueryRepository.findUserById(
      command.id
    );
    if (checkUserById) {
      throw new RpcException(
        new BadRequestException("Пользователь с таким id уже существует")
      );
    }

    const newUser = UserEntity.create(command);

    await this.usersRepository.save(newUser);
  }
}
