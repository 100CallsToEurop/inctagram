import { Module } from "@nestjs/common";
import { EmailManagerModule } from "./email-manager/email-manager.module";
import { ConfigModule } from "@nestjs/config";
import { ProvidersModule } from "@providers/providers";

@Module({
  imports: [
    EmailManagerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `envs/.notification.env`,
    }),
    ProvidersModule,
  ],
  controllers: [],
  providers: [],
})
export class NotificationModule {}
