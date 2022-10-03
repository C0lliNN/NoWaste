import * as cors from 'cors';
import * as express from 'express';
import helmet from 'helmet';
import { AccountService } from '../../core/accounts/AccountService';
import { CategoryService } from '../../core/categories/CategoryService';
import { auth, db } from '../firebase/firebase';
import { AccountController } from '../http/controllers/AccountController';
import { CategoryController } from '../http/controllers/CategoryController';
import { AuthMiddleware } from '../http/middlewares/AuthMiddleware';
import { ErrorMiddleware } from '../http/middlewares/ErrorMiddleware';
import { LoggerMiddleware } from '../http/middlewares/LoggerMiddleware';
import { Server } from '../http/Server';
import { Logger } from '../logger/Logger';
import { AccountRepository } from '../persistence/AccountRepository';
import { CategoryRepository } from '../persistence/CategoryRepository';
import compression = require('compression');
import { TransactionRepository } from '../persistence/TransactionRepository';
import { Clock } from '../utils/Clock';
import { TransactionService } from '../../core/transactions/TransactionService';
import { TransactionController } from '../http/controllers/TransactionController';
import { ReportController } from '../http/controllers/ReportController';
import { ReportService } from '../../core/reports/ReportService';

export class Container {
  NewServer(): Server {
    const logger = new Logger();

    const router = express.Router();

    const categoryRepository = new CategoryRepository(db);
    const categoryService = new CategoryService(categoryRepository);
    const categoryController = new CategoryController(categoryService, router);

    const accountRepository = new AccountRepository(db);
    const accountService = new AccountService(accountRepository);
    const accountController = new AccountController(accountService, router);

    const transactionRepository = new TransactionRepository(db);
    const clock = new Clock();
    const transactionService = new TransactionService(
      transactionRepository,
      accountService,
      categoryService,
      clock
    );
    const transactionController = new TransactionController(transactionService, router);

    const reportService = new ReportService(accountService, transactionService, clock);
    const reportController = new ReportController(reportService, router);

    const loggerMiddleware = new LoggerMiddleware(logger);
    const authMiddleware = new AuthMiddleware(auth, logger);
    const errorMiddleware = new ErrorMiddleware(logger);

    const server = new Server(
      errorMiddleware.handler(),
      loggerMiddleware.handler(),
      cors({ origin: true }),
      helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false
      }),
      express.json(),
      compression(),
      authMiddleware.handler(),
      categoryController.handler(),
      accountController.handler(),
      transactionController.handler(),
      reportController.handler()
    );
    return server;
  }
}
