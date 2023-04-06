import {
  IAmqpBaseRequest,
  IAmqpBaseResponse,
  IQueueDeclaration,
} from "@amqp-contracts/amqp-contracts/shared";
import { DeleteUserRequest, DeleteUserResponse } from "./interfaces";
import { EXCHANGE_INCTOGRAM } from "@amqp-contracts/amqp-contracts/exchanges";

export namespace DeleteUserContract {
  export const queue: IQueueDeclaration = {
    exchange: EXCHANGE_INCTOGRAM,
    routingKey: `${EXCHANGE_INCTOGRAM.name}.user.delete`,
    queue: `${EXCHANGE_INCTOGRAM.name}.user.delete`,
    queueOptions: { durable: true }, //если сервис остановился, то потом все доставит после перезапуска
  };

  export type request = IAmqpBaseRequest<DeleteUserRequest>;
  export type response = IAmqpBaseResponse<DeleteUserResponse>;
}
