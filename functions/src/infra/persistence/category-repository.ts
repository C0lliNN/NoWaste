import { firestore } from 'firebase-admin';
import { Category } from '../../core/categories/category';

export class CategoryRepository {
  db: firestore.Firestore;

  constructor(db: firestore.Firestore) {
    this.db = db;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.db.collection('categories').get();
    return categories.docs.map(
      (doc: any): Category => ({
        id: doc.id,
        name: doc.name
      })
    );
  }

  async save(category: Category): Promise<void> {
    const doc = await this.db.collection('category').doc(category.id);
    await doc.set(category);
  }

  async delete(id: string): Promise<void> {
    await this.db.collection('category').doc(id).delete();
  }
}
