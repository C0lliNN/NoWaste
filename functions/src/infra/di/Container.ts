import { CategoryService } from '../../core/categories/CategoryService';
import { db } from '../firebase/firebase';
import { CategoryController } from '../http/controllers/CategoryController';
import { Server } from '../http/Server';
import { CategoryRepository } from '../persistence/CategoryRepository';
import * as express from 'express';

export class Container {
  NewServer(): Server {
    const categoryRepository = new CategoryRepository(db);
    const categoryService = new CategoryService(categoryRepository);
    const categoryController = new CategoryController(categoryService, express.Router());
    const server = new Server(categoryController);
    return server;
  }
}
