import { describe, expect, it, jest } from '@jest/globals';
import { newAccount, newQuery } from '../../test/AccountFactory';
import { AuthorizationError } from '../errors/AuthorizationError';
import { ValidationError } from '../errors/ValidationError';
import { Account } from './Account';
import { AccountService } from './AccountService';
import { CreateAccountRequest } from './CreateAccountRequest';
import { DeleteAccountRequest } from './DeleteAccountRequest';
import { UpdateAccountRequest } from './UpdateAccountRequest';

function newRepositoryMock() {
  return {
    findByQuery: jest.fn(async (query: AccountQuery) => [] as Account[]),
    findById: jest.fn(async (id: string) => ({} as Account)),
    save: jest.fn(async (account: Account) => {}),
    delete: jest.fn(async (userId: string) => {})
  };
}

describe('AccountService', () => {
  describe('getAccounts', () => {
    it('should return the accounts when the repository is successful', () => {
      const accounts: Account[] = [newAccount(), newAccount()];

      const repoMock = newRepositoryMock();
      repoMock.findByQuery.mockReturnValue(Promise.resolve(accounts));

      const service = new AccountService(repoMock);
      const expectedAccounts = accounts.map((account) => ({
        id: account.id,
        name: account.name,
        balance: account.balance,
        color: account.color,
        useCount: account.useCount
      }));

      expect(
        service.getAccounts({ userId: 'some id', sortBy: 'balance', sortDirection: 'desc' })
      ).resolves.toStrictEqual(expectedAccounts);
      expect(repoMock.findByQuery).toHaveBeenCalledWith({
        userId: 'some id',
        sortBy: 'balance',
        sortDirection: 'desc'
      });
    });

    it('should create a default sortBy and sortDirection when the request does not contain these values', () => {
      const accounts: Account[] = [newAccount(), newAccount()];

      const repoMock = newRepositoryMock();
      repoMock.findByQuery.mockReturnValue(Promise.resolve(accounts));

      const service = new AccountService(repoMock);
      const expectedAccounts = accounts.map((account) => ({
        id: account.id,
        name: account.name,
        balance: account.balance,
        color: account.color,
        useCount: account.useCount
      }));

      expect(service.getAccounts({ userId: 'user-id' })).resolves.toStrictEqual(expectedAccounts);
      expect(repoMock.findByQuery).toHaveBeenCalledWith({
        userId: 'user-id',
        sortBy: 'name',
        sortDirection: 'asc'
      });
    });

    it('should throw an error when the repository is successful', async () => {
      const repoMock = newRepositoryMock();
      repoMock.findByQuery.mockReturnValue(Promise.reject(new Error('some error')));

      const service = new AccountService(repoMock);
      expect(service.getAccounts(newQuery())).rejects.toStrictEqual(new Error('some error'));
    });
  });

  describe('getAccount', () => {
    it('should throw an error if account is not found', () => {
      const repoMock = newRepositoryMock();
      repoMock.findById.mockReturnValue(Promise.reject(new Error('some error')));

      const service = new AccountService(repoMock);
      expect(
        service.getAccount({ accountId: 'categor-id', userId: 'user-id' })
      ).rejects.toThrowError();
    });

    it('should throw an error if user is not the owner account', () => {
      const account = newAccount();
      const repoMock = newRepositoryMock();
      repoMock.findById.mockReturnValue(Promise.resolve(account));

      const service = new AccountService(repoMock);
      expect(
        service.getAccount({ accountId: 'categor-id', userId: 'user-id' })
      ).rejects.toThrowError(AuthorizationError);
    });

    it('should not throw any error if user is the owner account', () => {
      const account = newAccount();
      const repoMock = newRepositoryMock();
      repoMock.findById.mockReturnValue(Promise.resolve(account));

      const service = new AccountService(repoMock);
      expect(
        service.getAccount({ accountId: 'categor-id', userId: account.userId })
      ).resolves.not.toThrowError();
    });
  });

  describe('createAccount', () => {
    it('should throw a ValidationError if the data is not invalid', () => {
      const req: CreateAccountRequest = {
        id: 'some-id',
        name: '',
        balance: 14,
        color: '#000000',
        userId: 'user-id'
      };

      const service = new AccountService(newRepositoryMock());

      expect(service.createAccount(req)).rejects.toBeInstanceOf(ValidationError);
    });

    it('should throw an Error if the repository fails to save the document', () => {
      const req: CreateAccountRequest = {
        id: 'some-id',
        name: 'Nubank',
        balance: 14,
        color: '#000000',
        userId: 'user-id'
      };

      const repoMock = newRepositoryMock();
      repoMock.save.mockRejectedValue(new Error('some error'));
      const service = new AccountService(repoMock);

      expect(service.createAccount(req)).rejects.toStrictEqual(new Error('some error'));
    });

    it('should should throw not any error if the data is valid and the repository succeeds', () => {
      const req: CreateAccountRequest = {
        id: 'some-id',
        name: 'NuBank',
        balance: 14,
        color: '#000000',
        userId: 'user-id'
      };
      const service = new AccountService(newRepositoryMock());

      expect(service.createAccount(req)).resolves.not.toThrow();
    });
  });

  describe('updateAccount', () => {
    it('should throw an AuthorizationError error if the user is not the owner of the account', () => {
      const req: UpdateAccountRequest = {
        id: 'some-id',
        name: 'Nubank',
        balance: 14,
        color: '#000000',
        userId: 'user-id'
      };

      const account = newAccount();

      const mockRepo = newRepositoryMock();
      mockRepo.findById.mockResolvedValue(account);

      const service = new AccountService(mockRepo);

      expect(service.updateAccount(req)).rejects.toBeInstanceOf(AuthorizationError);
    });

    it('should throw a ValidationError if the data is not invalid', () => {
      const req: UpdateAccountRequest = {
        id: 'some-id',
        name: '',
        balance: 14,
        color: '#000000',
        userId: 'user-id'
      };

      const account = newAccount();
      account.userId = req.userId;

      const mockRepo = newRepositoryMock();
      mockRepo.findById.mockResolvedValue(account);

      const service = new AccountService(mockRepo);

      expect(service.updateAccount(req)).rejects.toBeInstanceOf(ValidationError);
    });

    it('should update the account and save it if the data is valid and the user is the owner', () => {
      const req: UpdateAccountRequest = {
        id: 'some-id',
        name: 'new name',
        balance: 14,
        color: '#000000',
        userId: 'user-id'
      };

      const account = newAccount();
      account.userId = req.userId;

      const mockRepo = newRepositoryMock();
      mockRepo.findById.mockResolvedValue(account);
      mockRepo.save.mockResolvedValue();

      const service = new AccountService(mockRepo);
      expect(service.updateAccount(req)).resolves.not.toThrow();
      expect(mockRepo.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateAmount', () => {
    it('should throw an error if account is not found', () => {
      const repoMock = newRepositoryMock();
      repoMock.findById.mockReturnValue(Promise.reject(new Error('some error')));

      const service = new AccountService(repoMock);
      expect(
        service.updateAmount({ accountId: 'account-id', userId: 'user-id', amountToBeUpdated: 2 })
      ).rejects.toThrowError();
    });

    it('should throw an error if user is not the owner account', () => {
      const account = newAccount();
      const repoMock = newRepositoryMock();
      repoMock.findById.mockReturnValue(Promise.resolve(account));

      const service = new AccountService(repoMock);
      expect(
        service.updateAmount({ accountId: 'account-id', userId: 'user-id', amountToBeUpdated: 2 })
      ).rejects.toThrowError(AuthorizationError);
    });

    it('should not throw any error if account is updated successfully', () => {
      const account = newAccount();
      const repoMock = newRepositoryMock();
      repoMock.findById.mockReturnValue(Promise.resolve(account));

      const service = new AccountService(repoMock);

      expect(
        service.updateAmount({
          accountId: 'account-id',
          userId: account.userId,
          amountToBeUpdated: 2
        })
      ).resolves.not.toThrowError();
    });
  });

  describe('incrementUseCount', () => {
    it('should throw an error if account is not found', () => {
      const repoMock = newRepositoryMock();
      repoMock.findById.mockReturnValue(Promise.reject(new Error('some error')));

      const service = new AccountService(repoMock);
      expect(service.incrementUseCount('id')).rejects.toThrowError();
    });

    it('should not throw any error if user is the owner account', () => {
      const account = newAccount();
      const repoMock = newRepositoryMock();
      repoMock.findById.mockReturnValue(Promise.resolve(account));

      const service = new AccountService(repoMock);
      expect(service.incrementUseCount('id')).resolves.not.toThrowError();
    });
  });

  describe('deleteAccount', () => {
    it('should throw an error if the account was not found', () => {
      const req: DeleteAccountRequest = {
        accountId: 'some-id',
        userId: 'user-id'
      };

      const mockRepo = newRepositoryMock();
      mockRepo.findById.mockRejectedValue(new Error());

      const service = new AccountService(mockRepo);

      expect(service.deleteAccount(req)).rejects.toStrictEqual(new Error());
    });
    it('should throw an error if the user is not the account owner', () => {
      const req: DeleteAccountRequest = {
        accountId: 'some-id',
        userId: 'user-id'
      };

      const account = newAccount();

      const mockRepo = newRepositoryMock();
      mockRepo.findById.mockResolvedValue(account);

      const service = new AccountService(mockRepo);

      expect(service.deleteAccount(req)).rejects.toBeInstanceOf(AuthorizationError);
    });
    it('should not throw an error if the user is the account owner', () => {
      const req: DeleteAccountRequest = {
        accountId: 'some-id',
        userId: 'user-id'
      };

      const account = newAccount();
      account.userId = req.userId;

      const mockRepo = newRepositoryMock();
      mockRepo.findById.mockResolvedValue(account);

      const service = new AccountService(mockRepo);

      expect(service.deleteAccount(req)).resolves.not.toThrow();
    });
  });
});
