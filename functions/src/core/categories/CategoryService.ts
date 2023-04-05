import { AuthorizationError } from '../errors/AuthorizationError';
import { ValidationError } from '../errors/ValidationError';
import { Category } from './Category';
import { CategoryRepository } from './CategoryRepository';
import { CategoryResponse } from './CategoryResponse';
import { CategoryType, isCategoryType } from './CategoryType';
import { CreateCategoryRequest } from './CreateCategoryRequest';
import { DeleteCategoryRequest } from './DeleteCategoryRequest';
import { GetCategoriesRequest } from './GetCategoriesRequest';
import { GetCategoryRequest } from './GetCategoryRequest';
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
      type: c.type,
      color: c.color,
      useCount: c.useCount
    }));
  }

  public async getCategory(req: GetCategoryRequest): Promise<CategoryResponse> {
    const category = await this.categoryRepository.findById(req.categoryId);
    if (category.userId !== req.userId) {
      throw new AuthorizationError('The requested action is forbidden');
    }

    return {
      id: category.id,
      name: category.name,
      type: category.type,
      color: category.color,
      useCount: category.useCount
    };
  }

  public async createCategory(req: CreateCategoryRequest): Promise<void> {
    this.validateType(req.type);

    const category = new Category(
      req.id,
      req.name,
      req.type as CategoryType,
      req.color,
      0,
      req.userId
    );
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
    category.color = req.color;

    category.validate();

    return await this.categoryRepository.save(category);
  }

  public async incrementUseCount(categoryId: string): Promise<void> {
    const category = await this.categoryRepository.findById(categoryId);

    category.incrementUseCount();

    await this.categoryRepository.save(category);
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
