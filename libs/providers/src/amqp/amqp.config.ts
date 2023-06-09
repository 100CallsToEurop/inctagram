import { EXCHANGE_INCTOGRAM } from "@amqp-contracts/amqp-contracts";
import { RabbitMQConfig, RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';

const AMQP_EXCHANGES: RabbitMQExchangeConfig[] = [EXCHANGE_INCTOGRAM];

export const amqpConfig = (configService: ConfigService): RabbitMQConfig => {
  const uri = configService.get('AMQP_URI');
  if (!uri) {
    throw new Error('"AMQP_URI" not found. Check .env');
  }
  return {
    exchanges: AMQP_EXCHANGES,
    uri,
    connectionInitOptions: { wait: false },
    connectionManagerOptions: {
      heartbeatIntervalInSeconds: 15,
      reconnectTimeInSeconds: 30,
    },
    enableControllerDiscovery: true,
  };
};
