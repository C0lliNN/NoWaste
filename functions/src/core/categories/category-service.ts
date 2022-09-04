import { Category } from './category';

interface CategoryRepository {
  findAll(): Promise<Category[]>;
  save(category: Category): Promise<void>;
  delete(id: string): Promise<void>;
}

export class CategoryService {
  categoryRepository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.categoryRepository = repository;
  }

  public async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  public async saveCategory(category: Category): Promise<void> {
    return await this.categoryRepository.save(category);
  }

  public async deleteCategory(categoryId: string): Promise<void> {
    return await this.categoryRepository.delete(categoryId);
  }
}
