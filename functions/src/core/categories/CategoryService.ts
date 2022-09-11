import { AuthorizationError } from '../errors/AuthorizationError';
import { Category } from './Category';
import { CategoryRepository } from './CategoryRepository';
import { CategoryResponse } from './CategoryResponse';
import { CreateCategoryRequest } from './CreateCategoryRequest';
import { DeleteCategoryRequest } from './DeleteCategoryRequest';
import { GetCategoriesRequest } from './GetCategoriesRequest';
import { UpdateCategoryRequest } from './UpdateCategoryRequest';

export class CategoryService {
  categoryRepository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.categoryRepository = repository;
  }

  public async getCategories(req: GetCategoriesRequest): Promise<CategoryResponse[]> {
    const categories = await this.categoryRepository.findAllByUserId(req.userId);

    return categories.map((c) => ({
      id: c.id,
      name: c.name
    }));
  }

  public async createCategory(req: CreateCategoryRequest): Promise<void> {
    const category = new Category(req.id, req.name, req.userId);
    category.validate();

    return await this.categoryRepository.save(category);
  }

  public async updateCategory(req: UpdateCategoryRequest): Promise<void> {
    const category = await this.categoryRepository.findById(req.id);
    if (category.userId !== req.userId) {
      throw new AuthorizationError('The requested action is forbidden');
    }

    category.name = req.name;
    category.validate();

    return await this.categoryRepository.save(category);
  }

  public async deleteCategory(req: DeleteCategoryRequest): Promise<void> {
    const category = await this.categoryRepository.findById(req.categoryId);
    if (category.userId !== req.userId) {
      throw new AuthorizationError('The requested action is forbidden');
    }

    return await this.categoryRepository.delete(req.categoryId);
  }
}
