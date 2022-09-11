import { describe, it, expect } from '@jest/globals';
import { isCategoryType } from './CategoryType';

describe('isCategoryType', () => {
  it('should return true when type is equal to "EXPENSE"', () => {
    expect(isCategoryType('EXPENSE')).toBeTruthy();
  });
  it('should return true when type is equal to "INCOME"', () => {
    expect(isCategoryType('INCOME')).toBeTruthy();
  });
  it('should return false when type is not "EXPENSE" or "INCOME"', () => {
    expect(isCategoryType('my-type')).toBeFalsy();
  });
});
