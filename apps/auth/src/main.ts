import { NestFactory } from "@nestjs/core";
import { AuthModule } from "./modules/auth.module";
import { ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        host: "0.0.0.0",
        port: 5001,
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
