import { describe, expect, it } from '@jest/globals';
import { ValidationError } from '../errors/ValidationError';
import { Account } from './Account';

describe('Account', () => {
  describe('validate', () => {
    it('should throw an error when id is empty', () => {
      const category = new Account('', 'Food', 'user-id');

      expect(() => category.validate()).toThrowError(ValidationError);
    });

    it('should throw an error when name is empty', () => {
      const category = new Account('id', '', 'user-id');

      expect(() => category.validate()).toThrowError(ValidationError);
    });

    it('should throw an error when userId is empty', () => {
      const category = new Account('id', 'Food', '');

      expect(() => category.validate()).toThrowError(ValidationError);
    });

    it('should not throw an error when fields are valid', () => {
      const category = new Account('id', 'Food', 'EXPENSE');

      expect(() => category.validate()).not.toThrow();
    });
  });
});
