import { CategoryService } from '../../core/categories/CategoryService';
import { db } from '../firebase/firebase';
import { CategoryController } from '../http/controllers/CategoryController';
import { Server } from '../http/Server';
import { CategoryRepository } from '../persistence/CategoryRepository';
import * as express from 'express';
import { ErrorMiddleware } from '../http/middlewares/ErrorMiddleware';
import { Logger } from '../logger/Logger';
import { LoggerMiddleware } from '../http/middlewares/LoggerMiddleware';

export class Container {
  NewServer(): Server {
    const logger = new Logger();
    const categoryRepository = new CategoryRepository(db);
    const categoryService = new CategoryService(categoryRepository);
    const categoryController = new CategoryController(categoryService, express.Router());
    const loggerMiddleware = new LoggerMiddleware(logger);
    const errorMiddleware = new ErrorMiddleware(logger);
    const server = new Server(categoryController, loggerMiddleware, errorMiddleware);
    return server;
  }
}
