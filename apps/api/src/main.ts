import { NestFactory } from "@nestjs/core";
import { ApiModule } from "./api.module";
import { configApp } from "./configs";

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.setGlobalPrefix("api");
  configApp(app);
  await app.listen(5000);
}
bootstrap();
