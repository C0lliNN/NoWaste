export interface GetTransactionsRequest {
  userId: string;
  startDate: Date;
  endDate?: Date;
}
