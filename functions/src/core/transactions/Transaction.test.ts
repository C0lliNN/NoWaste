import { expect, describe, it } from '@jest/globals';
import { newTransaction } from '../../test/TransactionFactory';
import { ValidationError } from '../errors/ValidationError';
import { isTransactionRecurrence, isTransactionType } from './Transaction';

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

describe('getAccountAmountToBeIncremented', () => {
  it('should return the negative amount when type is EXPENSE', () => {
    const transaction = newTransaction();
    transaction.amount = 1000;
    transaction.type = 'EXPENSE';

    expect(transaction.getAccountAmountToBeIncremented()).toBe(-1000);
  });
  it('should return the positive amount when type is INCOME', () => {
    const transaction = newTransaction();
    transaction.amount = 5000;
    transaction.type = 'INCOME';

    expect(transaction.getAccountAmountToBeIncremented()).toBe(5000);
  });
});

describe('isTransactionType', () => {
  it('should return true when type is EXPENSE', () => {
    expect(isTransactionType('EXPENSE')).toBeTruthy();
  });

  it('should return true when type is INCOME', () => {
    expect(isTransactionType('INCOME')).toBeTruthy();
  });

  it('should return false when type is an UNKNOWN string', () => {
    expect(isTransactionType('something')).toBeFalsy();
  });
});

describe('isTransactionRecurrence', () => {
  it('should return true when recurrence is ONE_TIME', () => {
    expect(isTransactionRecurrence('ONE_TIME')).toBeTruthy();
  });

  it('should return true when recurrence is MONTHLY', () => {
    expect(isTransactionRecurrence('MONTHLY')).toBeTruthy();
  });

  it('should return false when recurrence is an UNKNOWN string', () => {
    expect(isTransactionRecurrence('something')).toBeFalsy();
  });
});
