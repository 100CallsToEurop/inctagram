import {
  IAmqpBaseRequest,
  IAmqpBaseResponse,
  IQueueDeclaration,
} from '@amqp-contracts/amqp-contracts/shared';
import { CreateUserViewRequest, CreateUserViewResponse } from './interfaces';
import { EXCHANGE_INCTOGRAM } from '@amqp-contracts/amqp-contracts/exchanges';

export namespace ReadContract {
  export const queue: IQueueDeclaration = {
    exchange: EXCHANGE_INCTOGRAM,
    routingKey: `${EXCHANGE_INCTOGRAM.name}.user.create`,
    queue: `${EXCHANGE_INCTOGRAM.name}.read`,
    queueOptions: { durable: true }, //если сервис остановился, то потом все доставит после перезапуска
  };

  export type request = IAmqpBaseRequest<CreateUserViewRequest>;
  export type response = IAmqpBaseResponse<CreateUserViewResponse>;
}
