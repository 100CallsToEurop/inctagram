import { IAmqpBaseRequest } from "./amqp-base-request.interface";

export interface IAmqpBaseResponse<T = unknown> extends IAmqpBaseRequest<T> {
  error?: {
    code: string,
    message: string
  }
}
