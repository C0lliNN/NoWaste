export type CategoryType = 'INCOME' | 'EXPENSE';

export function isCategoryType(type: string): type is CategoryType {
  return ['INCOME', 'EXPENSE'].includes(type);
}
