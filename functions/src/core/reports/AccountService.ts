interface GetAccountsRequest {
  userId: string;
  sortBy: string;
  sortDirection: string;
}

export interface AccountResponse {
  name: string;
  balance: number;
}

export interface AccountService {
  getAccounts(req: GetAccountsRequest): Promise<AccountResponse[]>;
}
