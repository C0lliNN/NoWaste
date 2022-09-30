import { expect, describe, it } from '@jest/globals';
import { newTransaction } from '../../test/TransactionFactory';
import { ValidationError } from '../errors/ValidationError';

describe('Validate', () => {
  it('should throw an error when id is empty', () => {
    const transaction = newTransaction();
    transaction.id = '';

    expect(() => transaction.validate()).toThrowError(ValidationError);
  });
  it('should throw an error when userId is empty', () => {
    const transaction = newTransaction();
    transaction.userId = '';

    expect(() => transaction.validate()).toThrowError(ValidationError);
  });
  it('should throw an error when amount is negative', () => {
    const transaction = newTransaction();
    transaction.amount = -50;

    expect(() => transaction.validate()).toThrowError(ValidationError);
  });
  it('should not throw an error when fields are valid', () => {
    const transaction = newTransaction();

    expect(() => transaction.validate()).not.toThrowError(ValidationError);
  });
});
