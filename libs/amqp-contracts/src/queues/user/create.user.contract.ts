import {
  IAmqpBaseRequest,
  IAmqpBaseResponse,
  IQueueDeclaration,
} from "@amqp-contracts/amqp-contracts/shared";
import {
  CreateUserRequest,
  CreateUserResponse,
} from "./interfaces";
import { EXCHANGE_INCTOGRAM } from "@amqp-contracts/amqp-contracts/exchanges";

export namespace CreateUserContract {
  export const queue: IQueueDeclaration = {
    exchange: EXCHANGE_INCTOGRAM,
    routingKey: `${EXCHANGE_INCTOGRAM.name}.user.create`,
    queue: `${EXCHANGE_INCTOGRAM.name}.user.create`,
    queueOptions: { durable: true }, //если сервис остановился, то потом все доставит после перезапуска
  };

  export type request = IAmqpBaseRequest<CreateUserRequest>;
  export type response = IAmqpBaseResponse<CreateUserResponse>;
}
