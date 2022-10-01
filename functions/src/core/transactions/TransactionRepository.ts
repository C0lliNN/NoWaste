import { Transaction } from './Transaction';
import { TransactionQuery } from './TransactionQuery';

export interface TransactionRepository {
  findByQuery(query: TransactionQuery): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction>;
  save(transaction: Transaction): Promise<void>;
}
