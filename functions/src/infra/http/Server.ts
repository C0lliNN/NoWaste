import * as compression from 'compression';
import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import helmet from 'helmet';
import { CategoryController } from './controllers/CategoryController';
import { ErrorMiddleware } from './middlewares/ErrorMiddleware';

export class Server {
  categoryController: CategoryController;
  errorMiddleware: ErrorMiddleware;

  constructor(categoryController: CategoryController, errorMiddleware: ErrorMiddleware) {
    this.categoryController = categoryController;
    this.errorMiddleware = errorMiddleware;
  }

  public handler(): express.Express {
    const app = express();

    app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false
      })
    );
    app.use(express.json());
    app.use(compression());
    app.use(asyncHandler(this.categoryController.handler()));
    app.use(this.errorMiddleware.handler());

    return app;
  }
}
