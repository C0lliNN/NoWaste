import { CategoryService } from '../../core/categories/CategoryService';
import { db } from '../firebase/firebase';
import { CategoryController } from '../http/controllers/CategoryController';
import { Server } from '../http/Server';
import { CategoryRepository } from '../persistence/CategoryRepository';
import * as express from 'express';
import { ErrorMiddleware } from '../http/middlewares/ErrorMiddleware';

export class Container {
  NewServer(): Server {
    const categoryRepository = new CategoryRepository(db);
    const categoryService = new CategoryService(categoryRepository);
    const categoryController = new CategoryController(categoryService, express.Router());
    const errorMiddleware = new ErrorMiddleware();
    const server = new Server(categoryController, errorMiddleware);
    return server;
  }
}
