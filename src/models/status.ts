export interface Status {
  monthIncome: number;
  monthExpense: number;
  monthBalance: number;
  totalBalance: number;
  expensesByCategory: Array<{ categoryName: string; expense: number }>;
  balancesByAccount: Array<{ accountName: string; balance: number }>;
}
