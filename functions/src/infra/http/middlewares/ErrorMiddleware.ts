import * as express from 'express';
import { AuthenticationError } from '../../../core/errors/AuthenticationError';
import { EntityNotFoundError } from '../../../core/errors/EntityNotFoundError';
import { ValidationError } from '../../../core/errors/ValidationError';

interface ErrorResponse {
  message: string;
  details: string[];
  status: number;
}

interface Logger {
  error: (...args: any[]) => void;
}

export class ErrorMiddleware {
  logger: Logger;
  constructor(logger: Logger) {
    this.logger = logger;
  }

  handler(): express.ErrorRequestHandler {
    const that = this;
    return function (err: Error, req, res, next) {
      const response: ErrorResponse = {
        message: err.message,
        details: [],
        status: 500
      };

      if (err instanceof EntityNotFoundError) {
        response.message = err.message;
        response.status = 404;
      } else if (err instanceof ValidationError) {
        response.message = err.message;
        response.details = (err as ValidationError).errors.map((e) => `${e.field}: ${e.message}`);
        response.status = 400;
      } else if (err instanceof AuthenticationError) {
        response.message = err.message;
        response.status = 401;
      }

      that.logger.error('There was an error when processing the request.', response);

      res.status(response.status).send(response);
    };
  }
}
