import * as express from 'express';

export class Server {
  errorHandler: express.ErrorRequestHandler;
  handlers: express.Handler[];

  constructor(errorHandler: express.ErrorRequestHandler, ...handlers: express.Handler[]) {
    this.errorHandler = errorHandler;
    this.handlers = handlers;
  }

  public handler(): express.Express {
    const app = express();

    this.handlers.forEach((h) => app.use(h));
    app.use(this.errorHandler);

    return app;
  }
}
