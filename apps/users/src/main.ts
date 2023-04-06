import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: "0.0.0.0",
        port: 5002,
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
