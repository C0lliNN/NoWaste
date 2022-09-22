import { CategoryService } from '../../core/categories/CategoryService';
import { db, auth } from '../firebase/firebase';
import { CategoryController } from '../http/controllers/CategoryController';
import { Server } from '../http/Server';
import { CategoryRepository } from '../persistence/CategoryRepository';
import * as express from 'express';
import { ErrorMiddleware } from '../http/middlewares/ErrorMiddleware';
import { Logger } from '../logger/Logger';
import { LoggerMiddleware } from '../http/middlewares/LoggerMiddleware';
import { AuthMiddleware } from '../http/middlewares/AuthMiddleware';
import helmet from 'helmet';
import compression = require('compression');
import * as asyncHandler from 'express-async-handler';
import * as cors from 'cors';

export class Container {
  NewServer(): Server {
    const logger = new Logger();

    const categoryRepository = new CategoryRepository(db);
    const categoryService = new CategoryService(categoryRepository);
    const categoryController = new CategoryController(categoryService, express.Router());

    const loggerMiddleware = new LoggerMiddleware(logger);
    const authMiddleware = new AuthMiddleware(auth, logger);
    const errorMiddleware = new ErrorMiddleware(logger);

    const server = new Server(
      errorMiddleware.handler(),
      loggerMiddleware.handler(),
      helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false
      }),
      cors(),
      express.json(),
      compression(),
      asyncHandler(authMiddleware.handler()),
      asyncHandler(categoryController.handler())
    );
    return server;
  }
}
