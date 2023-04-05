import { faker } from '@faker-js/faker';
import { Account } from '../core/accounts/Account';

export function newAccount(): Account {
  return new Account(
    faker.datatype.uuid(),
    faker.finance.accountName(),
    faker.datatype.number(100),
    '#000000',
    faker.datatype.number(100),
    faker.datatype.uuid()
  );
}

export function newQuery(): AccountQuery {
  return {
    userId: faker.datatype.uuid(),
    sortBy: 'name',
    sortDirection: 'asc'
  };
}
