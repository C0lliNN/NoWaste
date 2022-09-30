import { faker } from '@faker-js/faker';
import { Transaction } from '../core/transactions/Transaction';

export function newTransaction(): Transaction {
  return new Transaction(
    faker.datatype.uuid(),
    faker.datatype.uuid(),
    'EXPENSE',
    'ONE_TIME',
    {
      id: faker.datatype.uuid(),
      name: faker.commerce.productMaterial()
    },
    {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName()
    },
    faker.datatype.number(1),
    faker.date.past(4),
    faker.date.soon(4),
    faker.date.soon(4),
    faker.lorem.words(4)
  );
}
