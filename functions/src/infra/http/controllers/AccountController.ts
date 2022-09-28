import express = require('express');
import * as asyncHandler from 'express-async-handler';
import { AccountService } from '../../../core/accounts/AccountService';

export class AccountController {
  accountService: AccountService;
  router: express.IRouter;

  constructor(accountService: AccountService, router: express.IRouter) {
    this.accountService = accountService;
    this.router = router;
  }

  public handler(): express.Handler {
    this.router.get('/accounts', asyncHandler(this.getAccounts.bind(this)));
    this.router.post('/accounts', asyncHandler(this.createAccount.bind(this)));
    this.router.put('/accounts/:id', asyncHandler(this.updateAccount.bind(this)));
    this.router.delete('/accounts/:id', asyncHandler(this.deleteAccount.bind(this)));
    return this.router;
  }

  private async getAccounts(req: express.Request, resp: express.Response) {
    const accounts = await this.accountService.getAccounts({ userId: req.userId });
    resp.send(accounts);
  }

  private async createAccount(req: express.Request, resp: express.Response) {
    await this.accountService.createAccount({
      id: req.body.id,
      name: req.body.name,
      userId: req.userId
    });

    resp.sendStatus(201);
  }

  private async updateAccount(req: express.Request, resp: express.Response) {
    await this.accountService.updateAccount({
      id: req.params.id,
      name: req.body.name,
      userId: req.userId
    });

    resp.sendStatus(200);
  }

  private async deleteAccount(req: express.Request, resp: express.Response) {
    await this.accountService.deleteAccount({ accountId: req.params.id, userId: req.userId });
    resp.sendStatus(200);
  }
}
