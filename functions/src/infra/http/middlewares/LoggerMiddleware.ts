import * as express from 'express';

interface Logger {
  info: (...args: any[]) => void;
}

export class LoggerMiddleware {
  logger: Logger;
  constructor(logger: Logger) {
    this.logger = logger;
  }

  handler(): express.RequestHandler {
    const that = this;
    return function (req, res, next) {
      const startTime = new Date();

      res.on('close', function () {
        const endTime = new Date();
        const duration = endTime.getTime() - startTime.getTime();

        that.logger.info(`${req.method} ${req.path}`, {
          responseTime: `${duration} ms`,
          responseStatus: res.statusCode
        });
      });

      next();
    };
  }
}
