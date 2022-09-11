import { firestore } from 'firebase-admin';
import { Category } from '../../core/categories/Category';
import { EntityNotFoundError } from '../../core/errors/EntityNotFoundError';

const collection = 'categories';

export class CategoryRepository {
  db: firestore.Firestore;

  constructor(db: firestore.Firestore) {
    this.db = db;
  }

  async findById(id: string): Promise<Category> {
    const category = await this.db.collection(collection).doc(id).get();

    if (!category.exists) {
      throw new EntityNotFoundError('Category', id);
    }

    return new Category(category.id, category.data()?.name, category.data()?.userId);
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.db.collection(collection).get();

    return categories.docs.map((doc) => new Category(doc.id, doc.data()?.name, doc.data()?.userId));
  }

  async save(category: Category): Promise<void> {
    const doc = this.db.collection(collection).doc(category.id);

    await doc.set(Object.assign({}, category));
  }

  async delete(id: string): Promise<void> {
    await this.db.collection(collection).doc(id).delete();
  }
}
