export interface CreateTransactionRequest {
  id: string;
  userId: string;
  type: string;
  recurrence: string;
  categoryId: string;
  accountId: string;
  amount: number;
  date?: Date;
  description?: string;
}
