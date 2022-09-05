import { Category } from './Category';

interface CategoryRepository {
  findById(id: string): Promise<Category>;
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

  public async createCategory(category: Category): Promise<void> {
    return await this.categoryRepository.save(category);
  }

  public async updateCategory(id: string, newCategory: Category): Promise<void> {
    const existingCategory = await this.categoryRepository.findById(id);
    existingCategory.name = newCategory.name;

    return await this.categoryRepository.save(existingCategory);
  }

  public async deleteCategory(categoryId: string): Promise<void> {
    return await this.categoryRepository.delete(categoryId);
  }
}
