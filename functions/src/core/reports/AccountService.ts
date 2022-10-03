interface GetAccountsRequest {
  userId: string;
}

export interface AccountResponse {
  name: string;
  balance: number;
}

export interface AccountService {
  getAccounts(req: GetAccountsRequest): Promise<AccountResponse[]>;
}
