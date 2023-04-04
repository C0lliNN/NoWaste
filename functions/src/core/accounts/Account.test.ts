import { describe, expect, it } from '@jest/globals';
import { ValidationError } from '../errors/ValidationError';
import { Account } from './Account';

describe('Account', () => {
  describe('validate', () => {
    it('should throw an error when id is empty', () => {
      const account = new Account('', 'Bank a', 12, '#000000', 0, 'user-id');

      expect(() => account.validate()).toThrowError(ValidationError);
    });

    it('should throw an error when name is empty', () => {
      const account = new Account('id', '', 12, '#000000', 0, 'user-id');

      expect(() => account.validate()).toThrowError(ValidationError);
    });

    it('should throw an error when color is empty', () => {
      const account = new Account('id', 'Bank a', 12, '', 0, 'user-id');

      expect(() => account.validate()).toThrowError(ValidationError);
    });

    it('should throw an error when color is not valid', () => {
      const account = new Account('id', 'Banka', 12, '000000', 0, 'user-id');

      expect(() => account.validate()).toThrowError(ValidationError);
    });

    it('should throw an error when userId is empty', () => {
      const account = new Account('id', 'Food', 12, '#000000', 0, '');

      expect(() => account.validate()).toThrowError(ValidationError);
    });

    it('should not throw an error when fields are valid', () => {
      const account = new Account('id', 'Food', 24, '#000000', 0, 'EXPENSE');

      expect(() => account.validate()).not.toThrow();
    });
  });

  describe('incrementUseCount', () => {
    it('should increment the use count', () => {
      const account = new Account('id', 'Food', 24, '#000000', 0, 'EXPENSE');
      account.incrementUseCount();

      expect(account.useCount).toBe(1);
    });
  });
});
