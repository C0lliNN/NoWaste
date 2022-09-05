import * as express from 'express';

interface ErrorResponse {
  message: string;
  details: string[];
}

export class ErrorMiddleware {
  handler(): express.ErrorRequestHandler {
    return function (err: Error, req, res, next) {
      console.log(`here`);
      if (err) {
        const response: ErrorResponse = {
          message: err.message,
          details: []
        };

        res.status(500).send(response);
      }
    };
  }
}
