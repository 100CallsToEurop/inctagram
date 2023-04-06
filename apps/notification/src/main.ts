import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { NotificationModule } from "./modules/notification.module";


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationModule,
    {
      transport: Transport.TCP,
      options: {
        host: "0.0.0.0",
        port: 5003,
      },
    }
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  await app.listen();
}
bootstrap();
