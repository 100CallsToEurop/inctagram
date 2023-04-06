import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AuthorizationModule } from './authorization/authorization.module';
import { RpcException} from '@nestjs/microservices';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../configs';
import { ProvidersModule } from '@providers/providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `envs/.auth.env`,
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfigService()),
    ProvidersModule,
    AuthorizationModule,
  ],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: RpcException }],
})
export class AuthModule {}
