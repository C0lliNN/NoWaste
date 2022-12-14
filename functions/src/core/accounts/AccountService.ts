import { AuthorizationError } from '../errors/AuthorizationError';
import { Account } from './Account';
import { AccountResponse } from './AccountReponse';
import { AccountRepository } from './AccountRepository';
import { CreateAccountRequest } from './CreateAccountRequest';
import { DeleteAccountRequest } from './DeleteAccountRequest';
import { GetAccountRequest } from './GetAccountRequest';
import { GetAccountsRequest } from './GetAccountsRequest';
import { UpdateAccountRequest } from './UpdateAccountRequest';
import { UpdateAmountRequest } from './UpdateAmountRequest';

export class AccountService {
  accountRepository: AccountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  public async getAccounts(req: GetAccountsRequest): Promise<AccountResponse[]> {
    const accounts = await this.accountRepository.findAllByUserId(req.userId);

    return accounts.map((c) => ({
      id: c.id,
      name: c.name,
      balance: c.balance
    }));
  }

  public async getAccount(req: GetAccountRequest): Promise<AccountResponse> {
    const account = await this.accountRepository.findById(req.accountId);
    if (account.userId !== req.userId) {
      throw new AuthorizationError('The requested action is forbidden');
    }

    return {
      id: account.id,
      name: account.name,
      balance: account.balance
    };
  }

  public async createAccount(req: CreateAccountRequest): Promise<void> {
    const account = new Account(req.id, req.name, req.balance, req.userId);
    account.validate();

    return await this.accountRepository.save(account);
  }

  public async updateAccount(req: UpdateAccountRequest): Promise<void> {
    const account = await this.accountRepository.findById(req.id);
    if (account.userId !== req.userId) {
      throw new AuthorizationError('The requested action is forbidden');
    }

    account.name = req.name;
    account.balance = req.balance;
    account.validate();

    return await this.accountRepository.save(account);
  }

  public async updateAmount(req: UpdateAmountRequest): Promise<void> {
    const account = await this.accountRepository.findById(req.accountId);
    if (account.userId !== req.userId) {
      throw new AuthorizationError('The requested action is forbidden');
    }

    account.balance += req.amountToBeUpdated;
    await this.accountRepository.save(account);
  }

  public async deleteAccount(req: DeleteAccountRequest): Promise<void> {
    const account = await this.accountRepository.findById(req.accountId);
    if (account.userId !== req.userId) {
      throw new AuthorizationError('The requested action is forbidden');
    }

    return await this.accountRepository.delete(req.accountId);
  }
}
