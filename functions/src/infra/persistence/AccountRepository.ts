import { firestore } from 'firebase-admin';
import { Account } from '../../core/accounts/Account';
import { AccountRepository as Repository } from '../../core/accounts/AccountRepository';
import { EntityNotFoundError } from '../../core/errors/EntityNotFoundError';

const collection = 'accounts';

export class AccountRepository implements Repository {
  db: firestore.Firestore;

  constructor(db: firestore.Firestore) {
    this.db = db;
  }

  async findByQuery(query: AccountQuery): Promise<Account[]> {
    const accounts = await this.db
      .collection(collection)
      .where('userId', '==', query.userId)
      .orderBy(query.sortBy, query.sortDirection)
      .get();

    return accounts.docs.map(this.mapDocumentToAccount);
  }

  async findById(id: string): Promise<Account> {
    const account = await this.db.collection(collection).doc(id).get();

    if (!account.exists) {
      throw new EntityNotFoundError('Account', id);
    }

    return this.mapDocumentToAccount(account);
  }

  async save(account: Account): Promise<void> {
    const doc = this.db.collection(collection).doc(account.id);

    await doc.set(Object.assign({}, account));
  }

  async delete(id: string): Promise<void> {
    await this.db.collection(collection).doc(id).delete();
  }

  private mapDocumentToAccount(doc: firestore.DocumentSnapshot): Account {
    return new Account(
      doc.id,
      doc.data()?.name,
      doc.data()?.balance,
      doc.data()?.color,
      doc.data()?.userId
    );
  }
}
