import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';

@Catch()
export class RpcException<T> extends BaseRpcExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    return super.catch(exception, host);
  }
}
