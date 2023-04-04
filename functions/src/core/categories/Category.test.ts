import { describe, expect, it } from '@jest/globals';
import { ValidationError } from '../errors/ValidationError';
import { Category } from './Category';

describe('Category', () => {
  describe('Validate', () => {
    it('should throw an error when id is empty', () => {
      const category = new Category('', 'Food', 'EXPENSE', '#000000', 0, 'user-id');

      expect(() => category.validate()).toThrowError(ValidationError);
    });

    it('should throw an error when name is empty', () => {
      const category = new Category('id', '', 'EXPENSE', '#000000', 0, 'user-id');

      expect(() => category.validate()).toThrowError(ValidationError);
    });

    it('should throw an error when color is empty', () => {
      const category = new Category('id', 'Food', 'EXPENSE', '', 0, 'user-id');

      expect(() => category.validate()).toThrowError(ValidationError);
    });

    it('should throw an error when color is not valid', () => {
      const category = new Category('id', 'Food', 'EXPENSE', '000000', 0, 'user-id');

      expect(() => category.validate()).toThrowError(ValidationError);
    });

    it('should throw an error when userId is empty', () => {
      const category = new Category('id', 'Food', 'EXPENSE', '#000000', 0, '');

      expect(() => category.validate()).toThrowError(ValidationError);
    });

    it('should not throw an error when fields are valid', () => {
      const category = new Category('id', 'Food', 'EXPENSE', '#000000', 0, 'user-id');

      expect(() => category.validate()).not.toThrow();
    });
  });

  describe('incrementUseCount', () => {
    it('should increment the use count', () => {
      const category = new Category('id', 'Food', 'EXPENSE', '#000000', 0, 'user-id');
      category.incrementUseCount();

      expect(category.useCount).toBe(1);
    });
  });
});
