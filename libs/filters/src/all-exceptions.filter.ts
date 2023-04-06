import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request } from 'express';

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(status).json(this._response(status, request, exception));
  }

  private _response(status: number, request: Request, exception: any) {
    this.logger.error(
      `${exception}; statusCode: ${status}; timestamp: ${new Date().toISOString()}; path: ${request?.url}; method: ${
        request?.method
      }; query: ${request?.query}; params: ${request?.params}; message: ${exception['message']}`,
    );
    return {
      // statusCode: status,
      // timestamp: new Date().toISOString(),
      // path: request?.url,
      // method: request?.method,
      // params: request?.params,
      // query: request?.query,
      // exception: {
      //   name: exception['name'],
      //   message: exception['message'],
      // },
      statusCode: status,
      message: exception.response['message'].length > 0 ? exception.response['message'][0] : exception['message'],
    };
  }
}


