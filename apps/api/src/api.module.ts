import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AtStrategy } from './strategies/jwt.strategy';
import { RtStrategy } from './strategies/jwt.refresh.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.api.env',
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 5001,
        },
      },
      {
        name: 'READ_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 5010,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AtStrategy,
    RtStrategy,
    // { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class ApiModule {}
