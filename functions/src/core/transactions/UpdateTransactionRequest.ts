export interface UpdateTransactionRequest {
  transactionId: string;
  userId: string;
  categoryId: string;
  amount: number;
  date?: Date;
}
