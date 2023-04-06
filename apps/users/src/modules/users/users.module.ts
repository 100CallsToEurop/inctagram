import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import {
  UsersQueryRepository,
  UsersRepository,
} from "./infrastructure/repositories";
import {
  UsersCreateUserHandler,
  UsersDeleteUserHandler,
} from "./application/commands/handlers";
import { UsersController } from "./api/users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./domain/entities/user.entity";

const handlers = [UsersCreateUserHandler, UsersDeleteUserHandler];
const adapters = [UsersRepository, UsersQueryRepository];

@Module({
  imports: [CqrsModule,  TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [...handlers, ...adapters],
})
export class UsersModule {}
