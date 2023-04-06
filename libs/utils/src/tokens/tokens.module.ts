import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TokensService } from "./tokens.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `envs/.auth.env`,
    }),
    JwtModule,
  ],
  controllers: [],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
