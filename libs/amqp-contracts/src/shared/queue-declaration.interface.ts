import { QueueOptions } from "@golevelup/nestjs-rabbitmq";
import { IRabbitExchangeConfig } from "./rabbit-exchange-config.interface";

export interface IQueueDeclaration {
  exchange: IRabbitExchangeConfig;
  routingKey: string
  queue: string
  queueOptions: QueueOptions
}