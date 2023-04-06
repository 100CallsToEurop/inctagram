import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthMeHandler } from './authorization/application/queries/handler';
import {
  ReadQueryRepository,
  ReadRepository,
} from './infrastructure/repositories';
import { AuthController } from './authorization/api/auth.controller';
import { _MongooseModule } from '@providers/providers/mongoose/mongoose.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserView, UserViewSchema } from '../domain/user-view.schema';
import { ReadCreateController } from './authorization/api/read.create.controller';
import { SetMeHandler } from './authorization/application/commands/set.me';
import { ProvidersModule } from '@providers/providers';
import { APP_FILTER } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';

const handlers = [AuthMeHandler, SetMeHandler];
const adapters = [ReadRepository, ReadQueryRepository];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.read.env',
    }),
    CqrsModule,
    ProvidersModule,
    _MongooseModule,
    MongooseModule.forFeature([
      { name: UserView.name, schema: UserViewSchema },
    ]),
  ],
  controllers: [AuthController, ReadCreateController],
  providers: [
    ...handlers,
    ...adapters,
    { provide: APP_FILTER, useClass: RpcException },
  ],
})
export class ReadModule {}
