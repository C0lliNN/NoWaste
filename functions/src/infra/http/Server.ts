import * as express from 'express';
import helmet from 'helmet';
import * as compression from 'compression';
import { CategoryController } from './controllers/CategoryController';

export class Server {
  categoryController: CategoryController;

  constructor(categoryController: CategoryController) {
    this.categoryController = categoryController;
  }

  public handler(): express.Express {
    const app = express();

    app.use(helmet());
    app.use(express.json());
    app.use(compression());
    app.use(this.categoryController.handler());

    return app;
  }
}
