import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProvidersModule } from '@providers/providers';
import { APP_FILTER } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../configs';


@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `envs/.users.env`,
    }),
    ProvidersModule,
    TypeOrmModule.forRootAsync(TypeOrmConfigService()),
  ],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: RpcException }],
})
export class AppModule {}
