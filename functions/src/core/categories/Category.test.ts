import { describe, expect, it } from '@jest/globals';
import { ValidationError } from '../errors/ValidationError';
import { Category } from './Category';

describe('Category', () => {
  describe('Validate', () => {
    it('should throw an error when id is empty', () => {
      const category = new Category('', 'Food', 'EXPENSE', 'user-id');

      expect(() => category.validate()).toThrowError(ValidationError);
    });

    it('should throw an error when name is empty', () => {
      const category = new Category('id', '', 'EXPENSE', 'user-id');

      expect(() => category.validate()).toThrowError(ValidationError);
    });

    it('should throw an error when userId is empty', () => {
      const category = new Category('id', 'Food', 'EXPENSE', '');

      expect(() => category.validate()).toThrowError(ValidationError);
    });

    it('should not throw an error when fields are valid', () => {
      const category = new Category('id', 'Food', 'EXPENSE', 'user-id');

      expect(() => category.validate()).not.toThrow();
    });
  });
});
