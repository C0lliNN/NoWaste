interface GetTransactionsRequest {
  userId: string;
  startDate: Date;
  endDate: Date;
}

type TransactionType = 'EXPENSE' | 'INCOME';

export interface TransactionResponse {
  type: TransactionType;
  amount: number;
  category: { name: string };
}

export interface TransactionService {
  getTransactions(req: GetTransactionsRequest): Promise<TransactionResponse[]>;
}
