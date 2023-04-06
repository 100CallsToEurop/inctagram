import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ReadModule } from './modules/read.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ReadModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 5010,
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
