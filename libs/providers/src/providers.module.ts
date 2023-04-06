import { Module } from '@nestjs/common';
import { AmqpModule } from './amqp/amqp.module';
import { _MongooseModule } from './mongoose/mongoose.module';

@Module({ imports: [AmqpModule, _MongooseModule] })
export class ProvidersModule {}
