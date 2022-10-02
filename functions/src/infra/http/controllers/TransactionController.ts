import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import { TransactionService } from '../../../core/transactions/TransactionService';

export class TransactionController {
  service: TransactionService;
  router: express.IRouter;

  constructor(service: TransactionService, router: express.IRouter) {
    this.service = service;
    this.router = router;
  }

  public handler(): express.Handler {
    this.router.get('/transactions', asyncHandler(this.getTransactions.bind(this)));
    this.router.get('/transactions/:id', asyncHandler(this.getTransaction.bind(this)));
    this.router.post('/transactions', asyncHandler(this.createTransaction.bind(this)));
    this.router.put('/transactions/:id', asyncHandler(this.updateTransaction.bind(this)));
    return this.router;
  }

  private async getTransactions(req: express.Request, resp: express.Response) {
    const transactions = await this.service.getTransactions({
      userId: req.userId,
      startDate: new Date(req.query.startDate as string),
      endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined
    });

    resp.send(transactions);
  }

  private async getTransaction(req: express.Request, resp: express.Response) {
    const transaction = await this.service.getTransaction({
      userId: req.userId,
      transactionId: req.params.id
    });

    resp.send(transaction);
  }

  private async createTransaction(req: express.Request, resp: express.Response) {
    await this.service.createTransaction({
      id: req.body.id,
      userId: req.userId,
      type: req.body.type,
      date: new Date(req.body.date),
      recurrence: req.body.recurrence,
      categoryId: req.body.categoryId,
      accountId: req.body.accountId,
      amount: req.body.amount,
      description: req.body.description
    });

    resp.sendStatus(201);
  }

  private async updateTransaction(req: express.Request, resp: express.Response) {
    await this.service.updateTransaction({
      transactionId: req.params.id,
      userId: req.userId,
      categoryId: req.body.categoryId,
      date: new Date(req.body.date),
      amount: req.body.amount
    });

    resp.sendStatus(200);
  }
}
