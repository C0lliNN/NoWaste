import * as express from 'express';
import { EntityNotFoundError } from '../../../core/errors/EntityNotFoundError';
import { ValidationError } from '../../../core/errors/ValidationError';

interface ErrorResponse {
  message: string;
  details: string[];
  status: number;
}

export class ErrorMiddleware {
  handler(): express.ErrorRequestHandler {
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
      }

      res.status(response.status).send(response);
    };
  }
}
