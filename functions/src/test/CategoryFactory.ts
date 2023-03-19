import { Category } from '../core/categories/Category';
import { faker } from '@faker-js/faker';

export function newCategory(): Category {
  return new Category(
    faker.datatype.uuid(),
    faker.commerce.department(),
    faker.helpers.arrayElement(['EXPENSE', 'INCOME']),
    '#000000',
    faker.datatype.uuid()
  );
}
