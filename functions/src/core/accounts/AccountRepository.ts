import { Account } from './Account';

export interface AccountRepository {
  findByQuery(query: AccountQuery): Promise<Account[]>;
  findById(id: string): Promise<Account>;
  save(account: Account): Promise<void>;
  delete(id: string): Promise<void>;
}
