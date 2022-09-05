import { firestore } from 'firebase-admin';
import { Category } from '../../core/categories/Category';

const collection = 'categories';

export class CategoryRepository {
  db: firestore.Firestore;

  constructor(db: firestore.Firestore) {
    this.db = db;
  }

  async findById(id: string): Promise<Category> {
    const category = await this.db.collection(collection).doc(id).get();

    return {
      id: category.id,
      name: category.data['name']
    };
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.db.collection(collection).get();
    return categories.docs.map(
      (doc): Category => ({
        id: doc.id,
        name: doc.data()['name']
      })
    );
  }

  async save(category: Category): Promise<void> {
    const doc = this.db.collection(collection).doc(category.id);

    await doc.set(category);
  }

  async delete(id: string): Promise<void> {
    await this.db.collection(collection).doc(id).delete();
  }
}
