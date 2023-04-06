import {
  IAmqpBaseRequest,
  IAmqpBaseResponse,
  IQueueDeclaration,
} from '@amqp-contracts/amqp-contracts/shared';
import {
  SendNotificationRequest,
  SendNotificationResponse,
} from './interfaces';
import { EXCHANGE_INCTOGRAM } from '@amqp-contracts/amqp-contracts/exchanges';

export namespace SendNotificationContract {
  export const queue: IQueueDeclaration = {
    exchange: EXCHANGE_INCTOGRAM,
    routingKey: `${EXCHANGE_INCTOGRAM.name}.notification`,
    queue: `${EXCHANGE_INCTOGRAM.name}.send.email`,
    queueOptions: { durable: true }, //если сервис остановился, то потом все доставит после перезапуска
  };

  export type request = IAmqpBaseRequest<SendNotificationRequest>;
  export type response = IAmqpBaseResponse<SendNotificationResponse>;
}
