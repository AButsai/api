import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { GlobalLoggerService } from './global-logger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: GlobalLoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage: any;

    if (exception instanceof HttpException) {
      errorMessage = exception.getResponse();

      if (typeof errorMessage === 'object') {
        errorMessage = {
          ...errorMessage,
          statusCode: status,
        };

        this.logger.log(
          `Received request: ${ctx.getRequest().method} ${
            ctx.getRequest().originalUrl
          } ${ctx.getRequest().ip}`,
        );
        this.logger.log(
          `Request payload: ${JSON.stringify(ctx.getRequest().body)}`,
        );
      }
    } else {
      errorMessage = {
        statusCode: status,
        message: exception.message || 'Internal Server Error',
        trace: exception.stack || null,
        timestamp: new Date().toISOString(),
        context: 'GlobalExceptionFilter',
        level: 'error',
      };

      this.logger.error(
        errorMessage.message,
        exception.stack,
        errorMessage.context,
      );
    }

    response.status(status).json(errorMessage);
  }
}
