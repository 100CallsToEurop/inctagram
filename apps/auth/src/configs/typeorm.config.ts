import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import {
  AuthBadTokensEntity,
  AuthUserEntity,
  UserBanInfoEntity,
  UserEmailConfirmationEntity,
  UserPasswordRecoveryEntity,
} from '../modules/authorization/domain/entity';

export const TypeOrmConfigService = (): TypeOrmModuleAsyncOptions => ({
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('PG_HOST'),
    port: +configService.get('PG_PORT'),
    username: configService.get('PG_USERNAME'),
    password: configService.get('PG_PASSWORD'),
    database: configService.get('PG_DATABASE'),
    //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    entities: [
      AuthBadTokensEntity,
      AuthUserEntity,
      UserBanInfoEntity,
      UserEmailConfirmationEntity,
      UserPasswordRecoveryEntity,
    ],
    synchronize: true,
    ssl: true, //for neon db
  }),
  inject: [ConfigService],
  imports: [ConfigModule],
});
