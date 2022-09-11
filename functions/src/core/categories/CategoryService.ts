import { AuthorizationError } from '../errors/AuthorizationError';
import { ValidationError } from '../errors/ValidationError';
import { Category } from './Category';
import { CategoryRepository } from './CategoryRepository';
import { CategoryResponse } from './CategoryResponse';
import { CategoryType, isCategoryType } from './CategoryType';
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
      name: c.name,
      type: c.type
    }));
  }

  public async createCategory(req: CreateCategoryRequest): Promise<void> {
    this.validateType(req.type);

    const category = new Category(req.id, req.name, req.type as CategoryType, req.userId);
    category.validate();

    return await this.categoryRepository.save(category);
  }

  public async updateCategory(req: UpdateCategoryRequest): Promise<void> {
    const category = await this.categoryRepository.findById(req.id);
    if (category.userId !== req.userId) {
      throw new AuthorizationError('The requested action is forbidden');
    }

    this.validateType(req.type);

    category.name = req.name;
    category.type = req.type as CategoryType;

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

  private validateType(type: string) {
    if (!isCategoryType(type)) {
      throw new ValidationError({
        field: 'type',
        message: 'The value must be either "INCOME" or "EXPENSE"'
      });
    }
  }
}
