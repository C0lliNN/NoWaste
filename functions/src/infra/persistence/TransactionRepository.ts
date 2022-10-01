import { firestore } from 'firebase-admin';
import { TransactionRepository as Repository } from '../../core/transactions/TransactionRepository';
import { EntityNotFoundError } from '../../core/errors/EntityNotFoundError';
import {
  Account,
  Category,
  Transaction,
  TransactionRecurrence,
  TransactionType
} from '../../core/transactions/Transaction';
import { TransactionQuery } from '../../core/transactions/TransactionQuery';

const collection = 'transactions';

export class TransactionRepository implements Repository {
  db: firestore.Firestore;

  constructor(db: firestore.Firestore) {
    this.db = db;
  }

  async findByQuery(query: TransactionQuery): Promise<Transaction[]> {
    let q = this.db.collection(collection).select();
    if (query.userId) {
      q = q.where('userId', '==', query.userId);
    }

    if (query.startDate) {
      q = q.where('date', '>=', query.startDate);
    }

    if (query.endDate) {
      q = q.where('date', '<=', query.endDate);
    }

    q = q.orderBy('date');

    const transactions = await q.get();
    return transactions.docs.map(this.mapDocumentToTransaction);
  }

  async findById(id: string): Promise<Transaction> {
    const transaction = await this.db.collection(collection).doc(id).get();

    if (!transaction.exists) {
      throw new EntityNotFoundError('Transaction', id);
    }

    return this.mapDocumentToTransaction(transaction);
  }

  async save(transaction: Transaction): Promise<void> {
    const doc = this.db.collection(collection).doc(transaction.id);

    await doc.set(Object.assign({}, transaction));
  }

  private mapDocumentToTransaction(doc: firestore.DocumentSnapshot): Transaction {
    return new Transaction(
      doc.id,
      doc.data()?.userId,
      doc.data()?.type as TransactionType,
      doc.data()?.recurrence as TransactionRecurrence,
      doc.data()?.category as Category,
      doc.data()?.account as Account,
      doc.data()?.amount as number,
      doc.data()?.date as Date,
      doc.data()?.createdAt as Date,
      doc.data()?.updatedAt as Date,
      doc.data()?.description
    );
  }
}
