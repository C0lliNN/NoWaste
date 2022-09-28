import { Account } from './Account';

export interface AccountRepository {
  findAllByUserId(userId: string): Promise<Account[]>;
  findById(id: string): Promise<Account>;
  save(account: Account): Promise<void>;
  delete(id: string): Promise<void>;
}
