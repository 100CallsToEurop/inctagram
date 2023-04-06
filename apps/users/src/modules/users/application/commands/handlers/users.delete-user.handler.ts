import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UsersDeleteUserCommand } from "../impl";
import {
  UsersQueryRepository,
  UsersRepository,
} from "../../../infrastructure/repositories";
import { RpcException } from "@nestjs/microservices";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UsersDeleteUserCommand)
export class UsersDeleteUserHandler
  implements ICommandHandler<UsersDeleteUserCommand>
{
  constructor(
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async execute(command: UsersDeleteUserCommand) {
    const user = await this.usersQueryRepository.findUserById(command.userId);
    if (!user) {
      throw new RpcException(
        new NotFoundException("Пользователь с таким id не найден")
      );
    }
    await this.usersRepository.delete(command.userId);
  }
}
