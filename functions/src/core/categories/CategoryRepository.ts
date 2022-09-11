import { Category } from './Category';

export interface CategoryRepository {
  findAllByUserId(userId: string): Promise<Category[]>;
  findById(id: string): Promise<Category>;
  save(category: Category): Promise<void>;
  delete(id: string): Promise<void>;
}
