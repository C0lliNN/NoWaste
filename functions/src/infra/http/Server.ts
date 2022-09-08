import * as express from 'express';
import helmet from 'helmet';
import * as compression from 'compression';
import { CategoryController } from './controllers/CategoryController';
import { ErrorMiddleware } from './middlewares/ErrorMiddleware';
import * as asyncHandler from 'express-async-handler';
import { LoggerMiddleware } from './middlewares/LoggerMiddleware';

export class Server {
  categoryController: CategoryController;
  loggerMiddleware: LoggerMiddleware;
  errorMiddleware: ErrorMiddleware;

  constructor(
    categoryController: CategoryController,
    loggerMiddleware: LoggerMiddleware,
    errorMiddleware: ErrorMiddleware
  ) {
    this.categoryController = categoryController;
    this.loggerMiddleware = loggerMiddleware;
    this.errorMiddleware = errorMiddleware;
  }

  public handler(): express.Express {
    const app = express();

    app.use(this.loggerMiddleware.handler());
    app.use(helmet());
    app.use(express.json());
    app.use(compression());
    app.use(asyncHandler(this.categoryController.handler()));
    app.use(this.errorMiddleware.handler());

    return app;
  }
}
