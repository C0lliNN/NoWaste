export interface ExpensesByCategory {
  categoryName: string;
  expense: number;
}

export interface BalancesByAccount {
  accountName: string;
  balance: number;
}

export interface Status {
  monthIncome: number;
  monthExpense: number;
  monthBalance: number;
  totalBalance: number;
  expensesByCategory: ExpensesByCategory[];
  balancesByAccount: BalancesByAccount[];
}
