import { describe, expect, it, jest } from '@jest/globals';
import { newCategory } from '../../test/CategoryFactory';
import { AuthorizationError } from '../errors/AuthorizationError';
import { ValidationError } from '../errors/ValidationError';
import { Category } from './Category';
import { CategoryService } from './CategoryService';
import { CreateCategoryRequest } from './CreateCategoryRequest';
import { DeleteCategoryRequest } from './DeleteCategoryRequest';
import { UpdateCategoryRequest } from './UpdateCategoryRequest';

function newRepositoryMock() {
  return {
    findAllByUserId: jest.fn(async (userId: string) => [] as Category[]),
    findById: jest.fn(async (id: string) => ({} as Category)),
    save: jest.fn(async (category: Category) => {}),
    delete: jest.fn(async (userId: string) => {})
  };
}

describe('CategoryService', () => {
  describe('getCategories', () => {
    it('should return the categories when the repository is successful', () => {
      const categories: Category[] = [newCategory(), newCategory()];

      const repoMock = newRepositoryMock();
      repoMock.findAllByUserId.mockReturnValue(Promise.resolve(categories));

      const service = new CategoryService(repoMock);
      const expectedCategories = categories.map((c) => ({
        id: c.id,
        name: c.name,
        type: c.type,
        color: c.color,
        useCount: c.useCount
      }));

      expect(service.getCategories({ userId: 'user-id' })).resolves.toStrictEqual(
        expectedCategories
      );
    });

    it('should throw an error when the repository is successful', async () => {
      const repoMock = newRepositoryMock();
      repoMock.findAllByUserId.mockReturnValue(Promise.reject(new Error('some error')));

      const service = new CategoryService(repoMock);
      expect(service.getCategories({ userId: 'user-id' })).rejects.toStrictEqual(
        new Error('some error')
      );
    });
  });

  describe('getCategory', () => {
    it('should throw an error if category is not found', () => {
      const repoMock = newRepositoryMock();
      repoMock.findById.mockReturnValue(Promise.reject(new Error('some error')));

      const service = new CategoryService(repoMock);
      expect(
        service.getCategory({ categoryId: 'categor-id', userId: 'user-id' })
      ).rejects.toThrowError();
    });

    it('should throw an error if user is not the owner category', () => {
      const category = newCategory();
      const repoMock = newRepositoryMock();
      repoMock.findById.mockReturnValue(Promise.resolve(category));

      const service = new CategoryService(repoMock);
      expect(
        service.getCategory({ categoryId: 'categor-id', userId: 'user-id' })
      ).rejects.toThrowError(AuthorizationError);
    });

    it('should not throw any error if user is the owner category', () => {
      const category = newCategory();
      const repoMock = newRepositoryMock();
      repoMock.findById.mockReturnValue(Promise.resolve(category));

      const service = new CategoryService(repoMock);
      expect(
        service.getCategory({ categoryId: 'categor-id', userId: category.userId })
      ).resolves.not.toThrowError();
    });
  });

  describe('createCategory', () => {
    it('should throw a ValidationError if the type is invalid', () => {
      const req: CreateCategoryRequest = {
        id: 'some-di',
        name: 'Food',
        type: '',
        color: '#000000',
        userId: 'user-id'
      };

      const service = new CategoryService(newRepositoryMock());

      expect(service.createCategory(req)).rejects.toBeInstanceOf(ValidationError);
    });

    it('should throw a ValidationError if the data is not invalid', () => {
      const req: CreateCategoryRequest = {
        id: '',
        name: 'Food',
        type: 'EXPENSE',
        color: '#000000',
        userId: 'user-id'
      };

      const service = new CategoryService(newRepositoryMock());

      expect(service.createCategory(req)).rejects.toBeInstanceOf(ValidationError);
    });

    it('should throw an Error if the repository fails to save the document', () => {
      const req: CreateCategoryRequest = {
        id: 'some-id',
        name: 'Food',
        type: 'EXPENSE',
        color: '#000000',
        userId: 'user-id'
      };

      const repoMock = newRepositoryMock();
      repoMock.save.mockRejectedValue(new Error('some error'));
      const service = new CategoryService(repoMock);

      expect(service.createCategory(req)).rejects.toStrictEqual(new Error('some error'));
    });

    it('should should not throw any error if the data is valid and the repository succeeds', () => {
      const req: CreateCategoryRequest = {
        id: 'some-id',
        name: 'Food',
        type: 'EXPENSE',
        color: '#000000',
        userId: 'user-id'
      };
      const service = new CategoryService(newRepositoryMock());

      expect(service.createCategory(req)).resolves.not.toThrow();
    });
  });
  describe('updateCategory', () => {
    it('should throw an AuthorizationError error if the user is not the owner of the category', () => {
      const req: UpdateCategoryRequest = {
        id: 'some-id',
        name: 'Food',
        type: 'EXPENSE',
        color: '#000000',
        userId: 'user-id'
      };

      const category = newCategory();

      const mockRepo = newRepositoryMock();
      mockRepo.findById.mockResolvedValue(category);

      const service = new CategoryService(mockRepo);

      expect(service.updateCategory(req)).rejects.toBeInstanceOf(AuthorizationError);
    });

    it('should throw a ValidationError if the type is invalid', () => {
      const req: UpdateCategoryRequest = {
        id: 'some-di',
        name: 'Food',
        type: '',
        color: '#000000',
        userId: 'user-id'
      };

      const category = newCategory();
      category.userId = req.userId;

      const mockRepo = newRepositoryMock();
      mockRepo.findById.mockResolvedValue(category);

      const service = new CategoryService(mockRepo);

      expect(service.updateCategory(req)).rejects.toBeInstanceOf(ValidationError);
    });

    it('should throw a ValidationError if the data is not invalid', () => {
      const req: UpdateCategoryRequest = {
        id: 'some-id',
        name: '',
        type: 'EXPENSE',
        color: '#000000',
        userId: 'user-id'
      };

      const category = newCategory();
      category.userId = req.userId;

      const mockRepo = newRepositoryMock();
      mockRepo.findById.mockResolvedValue(category);

      const service = new CategoryService(mockRepo);

      expect(service.updateCategory(req)).rejects.toBeInstanceOf(ValidationError);
    });

    it('should update the category and save it if the data is valid and the user is the owner', () => {
      const req: UpdateCategoryRequest = {
        id: 'some-id',
        name: 'new name',
        type: 'EXPENSE',
        color: '#000000',
        userId: 'user-id'
      };

      const category = newCategory();
      category.userId = req.userId;

      const mockRepo = newRepositoryMock();
      mockRepo.findById.mockResolvedValue(category);
      mockRepo.save.mockResolvedValue();

      const service = new CategoryService(mockRepo);
      expect(service.updateCategory(req)).resolves.not.toThrow();
      expect(mockRepo.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('incrementUseCount', () => {
    it('should throw an error if account is not found', () => {
      const repoMock = newRepositoryMock();
      repoMock.findById.mockReturnValue(Promise.reject(new Error('some error')));

      const service = new CategoryService(repoMock);
      expect(service.incrementUseCount('id')).rejects.toThrowError();
    });

    it('should not throw any error if user is the owner account', () => {
      const category = newCategory();
      const repoMock = newRepositoryMock();
      repoMock.findById.mockReturnValue(Promise.resolve(category));

      const service = new CategoryService(repoMock);
      expect(service.incrementUseCount('id')).resolves.not.toThrowError();
    });
  });

  describe('deleteCategory', () => {
    it('should throw an error if the category was not found', () => {
      const req: DeleteCategoryRequest = {
        categoryId: 'some-id',
        userId: 'user-id'
      };

      const mockRepo = newRepositoryMock();
      mockRepo.findById.mockRejectedValue(new Error());

      const service = new CategoryService(mockRepo);

      expect(service.deleteCategory(req)).rejects.toStrictEqual(new Error());
    });
    it('should throw an error if the user is not the category owner', () => {
      const req: DeleteCategoryRequest = {
        categoryId: 'some-id',
        userId: 'user-id'
      };

      const category = newCategory();

      const mockRepo = newRepositoryMock();
      mockRepo.findById.mockResolvedValue(category);

      const service = new CategoryService(mockRepo);

      expect(service.deleteCategory(req)).rejects.toBeInstanceOf(AuthorizationError);
    });
    it('should not throw an error if the user is the category owner', () => {
      const req: DeleteCategoryRequest = {
        categoryId: 'some-id',
        userId: 'user-id'
      };

      const category = newCategory();
      category.userId = req.userId;

      const mockRepo = newRepositoryMock();
      mockRepo.findById.mockResolvedValue(category);

      const service = new CategoryService(mockRepo);

      expect(service.deleteCategory(req)).resolves.not.toThrow();
    });
  });
});
