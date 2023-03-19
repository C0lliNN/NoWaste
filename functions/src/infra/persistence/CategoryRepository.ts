import { firestore } from 'firebase-admin';
import { Category } from '../../core/categories/Category';
import { CategoryRepository as Repository } from '../../core/categories/CategoryRepository';
import { CategoryType } from '../../core/categories/CategoryType';
import { EntityNotFoundError } from '../../core/errors/EntityNotFoundError';

const collection = 'categories';

export class CategoryRepository implements Repository {
  db: firestore.Firestore;

  constructor(db: firestore.Firestore) {
    this.db = db;
  }

  async findAllByUserId(userId: string): Promise<Category[]> {
    const categories = await this.db
      .collection(collection)
      .where('userId', '==', userId)
      .orderBy('name')
      .get();

    return categories.docs.map(this.mapDocumentToCategory);
  }

  async findById(id: string): Promise<Category> {
    const category = await this.db.collection(collection).doc(id).get();

    if (!category.exists) {
      throw new EntityNotFoundError('Category', id);
    }

    return this.mapDocumentToCategory(category);
  }

  async save(category: Category): Promise<void> {
    const doc = this.db.collection(collection).doc(category.id);

    await doc.set(Object.assign({}, category));
  }

  async delete(id: string): Promise<void> {
    await this.db.collection(collection).doc(id).delete();
  }

  private mapDocumentToCategory(doc: firestore.DocumentSnapshot): Category {
    return new Category(
      doc.id,
      doc.data()?.name,
      doc.data()?.type as CategoryType,
      doc.data()?.color as string,
      doc.data()?.userId
    );
  }
}
